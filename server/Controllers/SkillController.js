const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateRequiredFields = require("../Functions/ValidateRequiredFields");

exports.AllSkills = async (req, res, next) => {
    try {
        const skills = await prisma.skill.findMany({});
        res.status(200).json(skills);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddSkill = async (req, res, next) => {
    try {
        const { name, icon } = req.body;

        const requiredFields = {
            name: "Name",
            icon: "Icon",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }

        await prisma.skill.create({
            data: {
                name: name,
                icon: icon,
            },
        });

        res.status(201).json({
            message: `เพิ่มทักษะ ${name} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
