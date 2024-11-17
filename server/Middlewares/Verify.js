const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

exports.VerifyAuth = async (req,res,next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'การเข้าถึงถูกปฏิเสธ', type: 'error' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded.user){
            return res.status(401).json({ message: 'คุณไม่มีสิทธิ์เข้าถึง', type: 'error' });
        }
        const { id } = decoded.user;
        const user = await prisma.user.findUnique({
            select:{
                id: true,
                email: true,
                username: true,
                fullName: true,
                displayName: true,
                profileImg: true,
                sid: true,
                access: true,
                partylist: true,
            },
            where:{id:id}
        });
        if(!user){
            return res.status(401).json({ message: 'คุณไม่มีสิทธิ์เข้าถึง', type: 'error' });
        }
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: 'การเข้าถึงถูกปฏิเสธ', type: 'error' });
    }
}
