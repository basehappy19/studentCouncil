const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');


exports.AllStatuses = async (req, res, next) => {
    try {
        const statuses = await prisma.status.findMany({
            orderBy:{
                step: 'asc',
            }
        })
        res.status(200).json(statuses);
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}

exports.AllPolicyProgresses = async (req, res, next) => {
    try {
        const { category } = req.query;
        const policies = await prisma.policy.findMany({
            where: {
                category: {
                    id: isNaN(parseInt(category)) ? undefined : parseInt(category)
                },
            },
            include: {
                description:true,
                category:true,
                progresses: {
                    include: {
                        status: true,
                    },
                },
            },
            orderBy: {
                id: 'asc',
            },
        });

        const policiesWithCurrentProgress = policies.map((policy) => {
            const latestProgress = policy.progresses.reduce((latest, progress) => {
                return !latest || progress.startedAt > latest.startedAt ? progress : latest;
            }, null);

            return {
                ...policy,
                currentProgress: latestProgress, 
            };
        });

        res.status(200).json(policiesWithCurrentProgress);
    } catch (e) {
        e.status = 500;
        next(e);
    }
};

exports.StatisticProgresses = async (req, res, next) => {
    try {
        const policyCount = await prisma.policy.count({
            where: {
                isApproved: true,
            },
        });

        const allStatuses = await prisma.status.findMany();

        const statusCounts = await prisma.progressPolicy.groupBy({
            by: ['statusId'],
            where: {
                policy: {
                    isApproved: true,
                },
            },
            _count: {
                policyId: true,
            },
        });

        const result = await Promise.all(
            allStatuses.map(async (status) => {
                const matchedGroup = statusCounts.find((group) => group.statusId === status.id);
                
                return {
                    statusId: status.id,
                    count: matchedGroup ? matchedGroup._count.policyId : 0,
                    status: status,
                };
            })
        );

        res.status(200).json({ statistic: result, policies: policyCount });
    } catch (e) {
        e.status = 500;
        next(e);
    }
};


exports.AddStatus = async(req, res, next)=>{
    try {
        const { name, color } = req.body
        const requiredFields = {
            name: "Name",
        };
        const errorMessage = validateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).json({ message: errorMessage, type: "error" });
        }
        await prisma.status.create({
            data: {
                name,
                color
            },
        })
        res.status(201).json({message:`เพิ่มสถานะ ${name} เรียบร้อยแล้ว`, type: "success"})
    } catch (e) {
        e.status = 400; 
        next(e);
    }
}
