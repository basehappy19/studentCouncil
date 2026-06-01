const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all departments with their leaders and budget
 */
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
        });
        
        res.status(200).json(departments);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}
