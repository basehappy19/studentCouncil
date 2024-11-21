const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateRequiredFields = require("../Functions/ValidateRequiredFields");

exports.AllAccesses = async (req, res) => {
    try {
        const accesses = await prisma.access.findMany();
        res.status(200).send(accesses);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
};

exports.AddAccess = async (req, res) => {
    try {
        if (req.user.access !== 3) {
            return res
                .status(403)
                .json({
                    message: "คุณไม่มีสิทธิ์เพิ่มสิทธิ์เข้าถึง",
                    type: "error",
                });
        }
        const { name, description } = req.body;
        const requiredFields = {
            name: "Name",
            description: "Description",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        await prisma.access.create({
            data: { name: name, description: description },
        });
        res.json({
            message: `เพิ่มสิทธิ์ ${name} เรียบร้อยแล้ว`,
            type: "success",
        }).status(201);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
};
