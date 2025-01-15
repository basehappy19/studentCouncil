const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllRoles = async(req, res, next)=>{
    try {
        const roles = await prisma.role.findMany()
        res.send(roles).status(200)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.AddRole = async(req, res, next)=>{
    try {
        const { name } = req.body

        await prisma.role.create({
            data: {
                name
            }
        })
        res.json({message:`เพิ่มบทบาท ${name} เรียบร้อยแล้ว`, type: "success"}).status(201)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}
