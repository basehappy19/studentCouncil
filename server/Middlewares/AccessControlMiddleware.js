const fs = require('fs');
const path = require('path');

const accessControl = JSON.parse(fs.readFileSync(path.join(__dirname, 'AccessControl.json'), 'utf-8'));

const AccessControlMiddleware = (req, res, next) => {
    const route = accessControl.routes.find(r => {
        const regex = new RegExp(`^${r.path.replace(/:\w+/g, '\\w+')}$`);
        return regex.test(req.originalUrl) && r.method === req.method;
    });

    if (!route) {
        return next();  
    }

    if (route.requiresAuth) {
        if (!req.user) {
            return res.status(401).json({ message: 'กรุณาล็อกอินก่อนใช้งาน' });  
        }

        if (!route.allowedAccessIds.includes(req.user.accessId)) {
            return res.status(403).json({ message: 'คุณไม่มีสิทธิ์เข้าถึงเส้นทางนี้' }); 
        }
    }

    next();
};

module.exports = AccessControlMiddleware;
