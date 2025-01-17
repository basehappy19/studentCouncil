const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const VerifyAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        
        const { id } = decoded.user;
        
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                username: true,
                fullName: true,
                displayName: true,
                profile_image_128x128: true,
                profile_image_full: true,
                access: true,
                partyList: true
            },
            where: { id: id }
        });
        
        req.user = user || null; 
        
        next(); 
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: 'การเข้าถึงถูกปฏิเสธ', type: 'error' });
    }
}

module.exports = VerifyAuth;
