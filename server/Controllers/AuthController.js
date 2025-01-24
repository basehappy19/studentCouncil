const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ValidateRequiredFields = require("../Functions/ValidateRequiredFields");
exports.AddUser = async (req, res, next) => {
    try {
        if (req.user.accessId !== 3) {
            return res
                .status(401)
                .json({ message: "คุณไม่มีสิทธิ์เพื่มผู้ใช้", type: "error" });
        }
        const {
            email,
            username,
            password,
            fullName,
            displayName,
            profileImg,
            sid,
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

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        const UserExist = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });
        if (UserExist) {
            return res
                .status(200)
                .json({
                    message: `มีบัญชีผู้ใช้นี้ซ้ำอยู่แล้ว`,
                    type: "error",
                });
        }

        const salt = await bcrypt.genSalt(10);

        user = new User({
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
        });

        user.password = await bcrypt.hash(password, salt);

        await prisma.user.create({
            data: user,
        });

        res.status(200).json({
            message: `เพิ่ม ${username} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const requiredFields = {
            username: "Username",
            password: "Password",
        };

        const errorMessage = ValidateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "ชื่อผู้ใช้ไม่ถูกต้อง หรือ รหัสผ่านไม่ถูกต้อง", type: "error" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "ชื่อผู้ใช้ไม่ถูกต้อง หรือ รหัสผ่านไม่ถูกต้อง", type: "error" });
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                accessId: user.accessId,
            },
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1y",
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            accessId: user.accessId,
            token: token,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.getUserData = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res
                .status(401)
                .json({ message: "การเข้าถึงถูกปฏิเสธ", type: "error" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (decoded.user !== undefined) {
            const user = await prisma.user.findUnique({
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
            return res.status(200).send(user);
            
        } else {
            return res
                .json({
                    message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
                    type: "error",
                })
                .status(401);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
};
