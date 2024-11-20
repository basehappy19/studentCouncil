const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');
const validateRequiredFields = require('../Functions/ValidateRequiredFields');

exports.AllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                role: true,
                access: true
            }
        })

        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
}

exports.User = async (req, res) => {
    try {
        const { id } = req.user.id;        
        
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                role: true,
                access: true
            }
        })

        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
}

exports.updateUser = async(req, res) => {
    try {
        const { id } = req.query;
        const { email, username, password, fullName, displayName, profileImg, accessId, partylistId} = req.body;

        const requiredFields = {
            email: "Email",
            username: "Username",
            password: "Password",
            fullName: "FullName",
            displayName: "DisplayName",
            profileImg: "Profile Image",
            accessId: "Access ID",
            partylistId: "Partylist ID",
        }

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if(errorMessage) {
            return res.status(400).json({ message: errorMessage, type: 'error' });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ message: `ไม่พบผู้ใช้`, type: 'error' });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
        }

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                username,
                password: newPassword? newPassword : user.password,
                fullName,
                displayName,
                profileImg,
                accessId,
                partylistId
            }
        })

        res.status(204).json({ message: `อัพเดทข้อมูลของ ${username} เรียบร้อยแล้ว`, type: 'success' });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
};

exports.updateUserProfile = async (req, res, next) => {
    try {
        const { id } = req.query;

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(404).json({ message: `ไม่พบผู้ใช้`, type: 'error' });
        }

        if (user.profileImg && user.profileImg !== 'default-image.png') {
            const oldProfileImgPath = path.resolve('./Uploads/Users', user.profileImg);
            fs.unlink(oldProfileImgPath, (err) => {
                if (err) {
                    console.error(`Error while deleting old profile picture: ${err}`);
                }
            });
        }

        if (req.files && req.files.length > 0) {
            user.profileImg = req.files[0].filename; 
        }
        
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                profileImg: user.profileImg
            }
        })
        res.status(200).json({ message: `อัพเดทรูปโปรไฟล์ของ ${user.username} เรียบร้อยแล้ว`, type: 'success' });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
};

exports.RemoveUser = async (req, res) => {
    try {
        const { id } = req.query;

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })        

        if (!user) {
            return res.status(404).json({message: 'ไม่พบผู้ใช้', type: 'error'});
        }

        if (user.profileImg && user.profileImg !== 'default-image.png') {
            const profileImgPath = path.resolve('./Uploads/Users', user.profileImg);
            fs.unlink(profileImgPath, (err) => {
                if (err) {
                    console.error(`Error while deleting profile picture: ${err}`);
                }
            });
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: `ลบ ${user.username} เรียบร้อยแล้ว`, type: 'success' });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
}

