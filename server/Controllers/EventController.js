const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllEvents = async (req, res) => {
    try {
        
        const events = await prisma.event.findMany();

        res.status(200).send(events);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
