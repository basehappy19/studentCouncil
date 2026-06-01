const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.AllCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                id: 'asc',
            }
        });
        return res.status(200).json(categories);
    } catch (e) {
        console.error("[AllCategories Error]:", e);
        e.status = e.status || 500;
        next(e);
    }
};

exports.Category = async (req, res, next) => {
    try {
        const { id } = req.query;
        const category = await prisma.category.findFirst({
            include: {
                subCategories: {
                    include: {
                        subCategory: true,
                    },
                },
            },
            where: {
                id: isNaN(parseInt(id)) ? undefined : parseInt(id),
            }
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found", type: "error" });
        }

        return res.status(200).json(category);
    } catch (e) {
        console.error("[Category Error]:", e);
        e.status = e.status || 500;
        next(e);
    }
};
