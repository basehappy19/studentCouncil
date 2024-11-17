const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllRoles = async(req,res)=>{
    try {
        const roles = await prisma.role.findMany()
        res.send(roles).status(200)
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}

exports.AddRole = async(req,res)=>{
    try {
        const { name } = req.body

        await prisma.role.create({
            data: {
                name
            }
        })
        res.json({message:`เพิ่มบทบาท ${name} เรียบร้อยแล้ว`, type: "success"}).status(201)
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}
