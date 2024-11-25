const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllDepartments = async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                leader: true,
                budget: true,
            },
            orderBy: {
                budget: {
                    total: 'desc'
                }
            }
        })
        res.status(200).send(departments);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}