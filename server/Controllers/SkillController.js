const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');

exports.AllSkills = async(req,res)=>{
    try {
        const skills = await prisma.skill.findMany({})
        res.send(skills).status(200)
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}

exports.AddSkill = async(req,res)=>{
    try {
        const { name, icon } = req.body

        const requiredFields = {
            name: "Name",
            icon: "Icon"
        }

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res.status(400).send(errorMessage);
        }

        await prisma.skill.create({
            data: {
                name: name,
                icon: icon
            }
        })

        res.json({ message: `เพิ่มทักษะ ${name} เรียบร้อยแล้ว`, type: "success" }).status(201)
    } catch (err) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}