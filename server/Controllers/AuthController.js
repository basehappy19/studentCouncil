const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const ValidateRequiredFields = require("../Functions/ValidateRequiredFields");

const prisma = new PrismaClient();

/**
 * Helper function to generate JWT Token
 */
const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            username: user.username,
            accessId: user.accessId,
        },
    };
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1y",
    });
};

/**
 * Register a new user (Only for users with accessId === 3)
 */
exports.AddUser = async (req, res, next) => {
    try {
        // Authorization check
        if (!req.user || req.user.accessId !== 3) {
            return res.status(403).json({
                message: "คุณไม่มีสิทธิ์เพิ่มผู้ใช้ (Access Denied)",
                type: "error"
            });
        }

        const {
            email,
            username,
            password,
            fullName,
            displayName,
            profileImg,
            sid,
            roleId,
            accessId,
            partylistId,
        } = req.body;

        const requiredFields = {
            email: "Email",
            username: "Username",
            password: "Password",
            fullName: "FullName",
            displayName: "DisplayName",
            profileImg: "profile Image",
            sid: "Student ID",
            accessId: "Access Id",
            partylistId: "Partylist Id",
        };

        const errorMessage = ValidateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        // Check if user already exists
        const userExist = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (userExist) {
            return res.status(409).json({
                message: "มีบัญชีผู้ใช้นี้ซ้ำอยู่แล้ว (Username หรือ Email ถูกใช้ไปแล้ว)",
                type: "error",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data for Prisma
        const userData = {
            email,
            username,
            password: hashedPassword,
            fullName,
            displayName,
            profileImg,
            sid,
            roleId,
            accessId,
            partylistId,
        };

        // Create new user
        await prisma.user.create({
            data: userData,
        });

        return res.status(201).json({
            message: `เพิ่มผู้ใช้ ${username} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (error) {
        console.error("[AddUser Error]:", error);
        error.status = 500;
        next(error);
    }
};

/**
 * Authenticate user and get token
 */
exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const requiredFields = {
            username: "Username",
            password: "Password",
        };

        const errorMessage = ValidateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        // Find user
        const user = await prisma.user.findFirst({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({
                message: "ชื่อผู้ใช้ไม่ถูกต้อง หรือ รหัสผ่านไม่ถูกต้อง",
                type: "error"
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "ชื่อผู้ใช้ไม่ถูกต้อง หรือ รหัสผ่านไม่ถูกต้อง",
                type: "error"
            });
        }

        // Generate Token
        const token = generateToken(user);

        return res.status(200).json({
            id: user.id,
            username: user.username,
            accessId: user.accessId,
            token: token,
        });
    } catch (error) {
        console.error("[Login Error]:", error);
        error.status = 500;
        next(error);
    }
};

/**
 * Get authenticated user data
 */
exports.getUserData = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({
                message: "การเข้าถึงถูกปฏิเสธ (No Token Provided)",
                type: "error"
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return res.status(401).json({
                message: "Token ไม่ถูกต้อง หรือ หมดอายุ",
                type: "error"
            });
        }

        if (!decoded.user || !decoded.user.id) {
            return res.status(401).json({
                message: "Token ไม่สมบูรณ์",
                type: "error",
            });
        }

        const user = await prisma.user.findFirst({
            where: { id: decoded.user.id },
            select: {
                id: true,
                username: true,
                fullName: true,
                displayName: true,
                profile_image_128x128: true,
                profile_image_full: true,
                access: true,
                partyList: {
                    select: {
                        id: true,
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        nickName: true,
                        fullName: true,
                        bio: {
                            include: {
                                skills: {
                                    include: {
                                        skill: {
                                            include: {
                                                icon: true,
                                            }
                                        }
                                    }
                                },
                                experiences: {
                                    include: {
                                        experience: true,
                                    }
                                }
                            }
                        },
                        rank: true,
                        roles: {
                            select: {
                                id: true,
                                role: true,
                            },
                        },
                        contacts: {
                            include: {
                                platform: true,
                            }
                        },
                        profile_image_full: true,
                        profile_image_128x128: true,
                        showInHomepage: true,
                        order: true,
                        orderInHomepage: true
                    }
                },
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "ไม่พบข้อมูลผู้ใช้",
                type: "error"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("[getUserData Error]:", error);
        error.status = 500;
        next(error);
    }
};
