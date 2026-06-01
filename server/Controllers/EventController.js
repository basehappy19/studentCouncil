const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all events
 */
exports.AllEvents = async (req, res, next) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
