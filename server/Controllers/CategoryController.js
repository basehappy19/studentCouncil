const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllCategories = async(req,res)=>{
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                id: 'asc',
            }
        })
        res.send(categories).status(200)
    } catch (err) {
        console.log('Server Error : ' + err);
        res.status(500).send('Server Error')
    }
}

exports.Category = async(req,res)=>{
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
        res.send(category).status(200)
    } catch (err) {
        console.log('PolicyCategories Error : ' + err);
        res.status(500).send('PolicyCategories Error')
    }
}
