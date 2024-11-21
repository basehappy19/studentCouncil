const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');

exports.AllWorkTags = async(req, res, next)=>{
    try {
        const tags = await prisma.workTag.findMany()
        res.send(tags).status(200)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.AddWorkTag = async(req, res, next)=>{
    try {
        const { title, icon, color } = req.body;

        const requiredFields = {
            title: "Title",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res.status(400).send(errorMessage);
        }

        await prisma.workTag.create({
            data: {
                title,
                icon,
                color,
            },
        })

        res.json({ message: `เพิ่มแท็กงาน ${title} เรียบร้อยแล้ว`, type:'success' }).status(201);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}