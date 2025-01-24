const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validateRequiredFields = require("../Functions/ValidateRequiredFields");
const _ = require("lodash");

exports.RecommendPolicies = async (req, res, next) => {
    try {
        const allPolicies = await prisma.policy.findMany({
            select: {
                category: true,
                description: true,
                subCategories: {
                    include: {
                        subCategory: true,
                    },
                },
                progresses: {
                    select: {
                        id: true,
                        status: true,
                    },
                },
            },
        });

        const policies = _.sampleSize(allPolicies, 10);

        res.send(policies).status(200);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AllPolicies = async (req, res, next) => {
    try {
        const { category, subCategory } = req.query;

        const policies = await prisma.policy.findMany({
            include: {
                category: true,
                description: true,
                subCategories: {
                    include: {
                        subCategory: true,
                    },
                },
                progresses: {
                    include: {
                        status: true,
                    },
                },
            },
            where: {
                categoryId: isNaN(parseInt(category)) ? undefined : parseInt(category),
                ...(subCategory 
                    ? {
                        subCategories: {
                            some: {
                                subCategory: {
                                    id: isNaN(parseInt(subCategory)) ? undefined : parseInt(subCategory),
                                },
                            },
                        }
                    } 
                    : {}
                ),
            },
            orderBy: {
                order: 'asc'
            }       
        });
        res.status(200).send(policies);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
exports.Policy = async (req, res, next) => {
    try {
        const policy = await prisma.policy.findFirst({
            where: {
                id: parseInt(req.query.id),
            },
            include: {
                category: true,
                description: true,
                subCategories: {
                    include: {
                        subCategory: true,
                    },
                },
                progresses: {
                    select: {
                        id: true,
                        description: true,
                        startedAt: true,
                        status: true,
                    },
                },
            },
        });

        let currentProgress = null;
        if (policy && policy.progresses.length > 0) {
            currentProgress = policy.progresses.reduce((latest, progress) => {
                return !latest ||
                    new Date(progress.startedAt) > new Date(latest.startedAt)
                    ? progress
                    : latest;
            }, null);
        }

        const result = {
            ...policy,
            currentProgress,
        };

        res.status(200).send(result);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.LikePolicy = async (req, res, next) => {
    try {
        const { policyId } = req.body;

        if (!policyId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            });
        }

        const policy = await prisma.policy.update({
            where: {
                id: policyId,
            },
            data: {
                like: {
                    increment: 1,
                },
            },
        });
        res.status(200).json({
            message: `กดถูกใจนโยบาย ${policy.title} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.CommentPolicy = async (req, res, next) => {
    try {
        const { policyId, message } = req.body;

        if (!policyId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            });
        }
        const policy = await prisma.policy.findFirst({
            where: {
                id: policyId,
            },
        });

        await prisma.commentPolicy.create({
            data: {
                policyId: policy.id,
                message: message,
            },
        });
        res.status(200).json({
            message: `ส่งคอมเม้นนโยบาย ${policy.title} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddPolicy = async (req, res, next) => {
    try {
        const {
            rank,
            title,
            thumbnailImage,
            categoryId,
            subCategoryId,
            problem,
            offer,
            budget,
        } = req.body;
        const requiredFields = {
            rank: "Rank",
            title: "Title",
            thumbnailImage: "Thumbnail Image",
            categoryId: "Category ID",
            problem: "Problem",
            offer: "Offer",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        const category = await prisma.category.findFirst({
            where: {
                id: categoryId,
            },
        });

        await prisma.policy.create({
            data: {
                rank,
                title,
                thumbnailImage,
                categoryId,
                subcategoryId,
                problem,
                offer,
                budget,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                subcategories: {
                    connect: {
                        id: subcategoryId,
                    },
                },
                description: {
                    create: {
                        problem,
                        offer,
                        budget,
                    },
                },
            },
            include: {
                category: true,
                description: true,
                subcategories: true,
                progresses: true,
            },
        });
        res.json({
            message: `เพื่มนโยบาย ${title} ใน ${category.title} เรียบร้อยแล้ว`,
            type: "success",
        }).status(201);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
