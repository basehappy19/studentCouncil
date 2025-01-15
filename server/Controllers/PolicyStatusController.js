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
        res.status(200).send(statuses);
    } catch (e) {
        e.status = 400; 
        next(e);
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
                currentProgress: latestProgress, 
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
        // นับจำนวน Policy ที่ได้รับการอนุมัติ
        const policyCount = await prisma.policy.count({
            where: {
                isApproved: true, // เฉพาะ Policy ที่ได้รับการอนุมัติ
            },
        });

        // ดึงข้อมูลทั้งหมดของสถานะ
        const allStatuses = await prisma.status.findMany();

        // ดึงการนับจำนวน progress สำหรับ Policy ที่ได้รับการอนุมัติ
        const statusCounts = await prisma.progressPolicy.groupBy({
            by: ['statusId'],
            where: {
                policy: {
                    isApproved: true, // เฉพาะ Policy ที่ได้รับการอนุมัติ
                },
            },
            _count: {
                policyId: true,
            },
        });

        // สร้างผลลัพธ์ที่รวมข้อมูลสถานะทั้งหมด โดยตั้งค่าการนับเป็น 0 หากไม่มี progress
        const result = await Promise.all(
            allStatuses.map(async (status) => {
                // หา matchedGroup จาก statusCounts
                const matchedGroup = statusCounts.find((group) => group.statusId === status.id);
                
                return {
                    statusId: status.id,
                    count: matchedGroup ? matchedGroup._count.policyId : 0, // กำหนด count เป็น 0 หากไม่มี progress
                    status: status,
                };
            })
        );

        // ส่งผลลัพธ์กลับ
        res.status(200).json({ statistic: result, policies: policyCount });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server Error');
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
        e.status = 400; 
        next(e);
    }
}

