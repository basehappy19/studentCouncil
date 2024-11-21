const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AddUser = async (req, res, next) => {
    try {
        if(req.user.accessId !== 3){
            return res.status(401).json({ message: "คุณไม่มีสิทธิ์เพื่มผู้ใช้", type: "error" });
        }
        const {email, username, password, fullName, displayName, profileImg, sid, accessId, partylistId} = req.body;
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
            return res.status(400).json({ message: errorMessage, type: "error" });
        }
        
        const UserExist = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        });
        if(UserExist){
            return res.status(200).json({ message: `มีบัญชีผู้ใช้นี้ซ้ำอยู่แล้ว`, type:'error'});
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

        res.status(200).json({ message: `เพิ่ม ${username} เรียบร้อยแล้ว`, type: "success"});
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const requiredFields = {
            username: "Username",
            password: "Password",
        };
      
        const errorMessage = validateRequiredFields(req.body, requiredFields);
      
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        const user = await prisma.user.findFirst({
            where: {
                username
            },
        })

        if(!user) {
            return res.status(200).json({ message: `ไม่พบผู้ใช้ ${username}`, type: 'error' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(200).json({ message: "รหัสผ่านไม่ถูกต้อง", type: 'error' });
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                accessId: user.accessId
            }
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ 
            id: user.id,
            username: user.username,
            accessId: user.accessId,
            role: user.roleData,
            accessToken: token, 
        });

    } catch (e) {
        e.status = 400; 
        next(e);
    }
};



