const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllCategories = async(req, res, next)=>{
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                id: 'asc',
            }
        })
        res.status(200).send(categories)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.Category = async(req, res, next)=>{
    try {
        const { id } = req.query
        const category = await prisma.category.findFirst({
            include: {
                subCategories: true,
            },
            where:{
                id:isNaN(parseInt(id)) ? undefined : parseInt(id),
            }
        })
        res.status(200).send(category)
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}
