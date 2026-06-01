const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateRequiredFields = require("../Functions/ValidateRequiredFields");

exports.AllRoles = async(req, res, next)=>{
    try {
        const roles = await prisma.role.findMany()
        res.status(200).json(roles)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.AddRole = async(req, res, next)=>{
    try {
        const { name } = req.body

        const requiredFields = {
            name: "Name",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        await prisma.role.create({
            data: {
                name
            }
        })
        res.status(201).json({message:`เพิ่มบทบาท ${name} เรียบร้อยแล้ว`, type: "success"})
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}
