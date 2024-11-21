const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllDepartments = async (req, res) => {
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
        res.send(departments).status(200);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}