const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateRequiredFields = require('../Functions/ValidateRequiredFields');


exports.AllStatuses = async (req,res) => {
    try {
        const statuses = await prisma.status.findMany({
            orderBy:{
                step: 'asc',
            }
        })
        res.status(200).send(statuses);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}

exports.AllPolicyProgresses = async (req, res) => {
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
                current_progress: latestProgress, 
            };
        });

        res.status(200).send(policiesWithCurrentProgress);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
};

exports.StatisticProgresses = async (req, res) => {
    try {
        const policyCount = await prisma.policy.count();

        // Retrieve all statuses
        const allStatuses = await prisma.status.findMany();

        // Get the grouped counts for statuses that have progress
        const statusCounts = await prisma.progressPolicy.groupBy({
            by: ['statusId'],
            _count: {
                policyId: true,
            },
        });

        // Create a result that includes all statuses, setting count to 0 if no progress
        const result = await Promise.all(
            allStatuses.map(async (status) => {
                // Find the count for this status from `statusCounts`
                const matchedGroup = statusCounts.find((group) => group.statusId === status.id);
                
                return {
                    statusId: status.id,
                    count: matchedGroup ? matchedGroup._count.policyId : 0, // Set count to 0 if no match
                    status: status, 
                };
            })
        );

        res.status(200).json({ statistic: result, policies: policyCount });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
};

exports.AddStatus = async(req,res)=>{
    try {
        const { name, color } = req.body
        const requiredFields = {
            name: "Name",
        };
        const errorMessage = validateRequiredFields(req.body, requiredFields);
        if (errorMessage) {
            return res.status(400).send(errorMessage);
        }
        await prisma.status.create({
            data: {
                name,
                color
            },
        })
        res.json({message:`เพิ่มสถานะ ${name} เรียบร้อยแล้ว`, type: "success"}).status(201)
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error')
    }
}

