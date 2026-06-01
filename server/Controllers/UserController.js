const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const ValidateRequiredFields = require('../Functions/ValidateRequiredFields');

/**
 * Get all users
 */
exports.AllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                partyList: {
                    include: {
                        bio: true,
                        roles: {
                            include: {
                                role: true
                            }
                        }
                    }
                },
                access: true
            }
        });

        res.status(200).json(users);
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

/**
 * Get current user data
 */
exports.User = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'กรุณาเข้าสู่ระบบ', type: 'error' });
        }
        
        const { id } = req.user;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                partyList: {
                    include: {
                        roles: {
                            include: {
                                role: true
                            }
                        }
                    }
                },
                access: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้', type: 'error' });
        }

        res.status(200).json(user);
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

/**
 * Update user data (Admin or self-update)
 */
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { email, username, password, fullName, displayName, profileImg, accessId, partylistId } = req.body;

        // Basic authorization: user can only update themselves unless they are admin (accessId 3)
        if (req.user.id !== id && req.user.accessId !== 3) {
            return res.status(403).json({ message: 'คุณไม่มีสิทธิ์แก้ไขข้อมูลของผู้อื่น', type: 'error' });
        }

        const requiredFields = {
            email: "Email",
            username: "Username",
            fullName: "FullName",
            displayName: "DisplayName",
            accessId: "Access ID",
            partylistId: "Partylist ID",
        };

        const errorMessage = ValidateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: 'error' });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        
        if (!user) {
            return res.status(404).json({ message: `ไม่พบผู้ใช้`, type: 'error' });
        }

        let hashedPassword = user.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                username,
                password: hashedPassword,
                fullName,
                displayName,
                profileImg,
                accessId,
                partylistId
            }
        });

        res.status(200).json({ 
            message: `อัพเดทข้อมูลของ ${updatedUser.username} เรียบร้อยแล้ว`, 
            type: 'success' 
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Update user profile image
 */
exports.updateUserProfile = async (req, res, next) => {
    try {
        const { id } = req.query;

        // Basic authorization
        if (req.user.id !== id && req.user.accessId !== 3) {
            return res.status(403).json({ message: 'คุณไม่มีสิทธิ์แก้ไขรูปโปรไฟล์ของผู้อื่น', type: 'error' });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!user) {
            return res.status(404).json({ message: `ไม่พบผู้ใช้`, type: 'error' });
        }

        let profileImg = user.profileImg;

        if (req.files && req.files.length > 0) {
            // Delete old image if exists and not default
            if (user.profileImg && user.profileImg !== 'default-image.png') {
                const oldProfileImgPath = path.resolve('./Uploads/Users', user.profileImg);
                if (fs.existsSync(oldProfileImgPath)) {
                    fs.unlinkSync(oldProfileImgPath);
                }
            }
            profileImg = req.files[0].filename;
        }

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                profileImg: profileImg
            }
        });
        
        res.status(200).json({ message: `อัพเดทรูปโปรไฟล์ของ ${user.username} เรียบร้อยแล้ว`, type: 'success' });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Remove user (Admin only)
 */
exports.RemoveUser = async (req, res, next) => {
    try {
        // Authorization check: Only admins (accessId 3) can remove users
        if (req.user.accessId !== 3) {
            return res.status(403).json({ message: 'คุณไม่มีสิทธิ์ลบผู้ใช้', type: 'error' });
        }

        const { id } = req.query;

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้', type: 'error' });
        }

        if (user.profileImg && user.profileImg !== 'default-image.png') {
            const profileImgPath = path.resolve('./Uploads/Users', user.profileImg);
            if (fs.existsSync(profileImgPath)) {
                fs.unlinkSync(profileImgPath);
            }
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({ message: `ลบ ${user.username} เรียบร้อยแล้ว`, type: 'success' });
    } catch (e) {
        e.status = 400;
        next(e);
    }
}
