const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cron = require("node-cron");

const checkAndAddCheckInDay = async () => {
    try {
        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay(); 
        const hours = dateNow.getHours();

        const startOfToday = new Date(
            dateNow.getFullYear(),
            dateNow.getMonth(),
            dateNow.getDate(),
            0,
            0,
            0
        );

        const latestSettingTime = await prisma.setting.findFirst({
            select: {
                checkInStartDay: true,
                checkInEndDay: true,
                checkInStartTime: true,
                checkInEndTime: true,
                requestStartTime: true,
                requestEndTime: true,
                checkInOpen: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const existingCheckInDay = await prisma.checkInDay.findFirst({
            where: {
                dateTime: startOfToday,
            },
        });

        if (dayOfWeek === 6 || dayOfWeek === 0) {
            if (!existingCheckInDay) {
                const checkInDay = await prisma.checkInDay.create({
                    data: {
                        dateTime: startOfToday,
                    },
                });

                const allUsers = await prisma.user.findMany({
                    select: {
                        id: true,
                        partyListId: true,
                    },
                });

                const checkIns = allUsers.map((user) => ({
                    attendTime: null,
                    type: "HOLIDAY",
                    reason: null, 
                    userId: user.id,
                    checkInDayId: checkInDay.id,
                }));

                await prisma.checkIn.createMany({
                    data: checkIns,
                });
            }
        } else {
            if (existingCheckInDay) {
                if (
                    hours >= latestSettingTime.requestStartTime &&
                    hours < latestSettingTime.requestEndTime &&
                    latestSettingTime.checkInOpen
                ) {
                    await prisma.checkIn.updateMany({
                        where: {
                            checkInDayId: existingCheckInDay.id,
                            type: "NOT_CHECKED_IN", 
                            attendTime: null,
                        },
                        data: {
                            type: "REQUEST_FOR_CHECK_IN",
                        },
                    });
                }

                if (
                    hours >= latestSettingTime.checkInEndTime &&
                    hours >= latestSettingTime.requestEndTime &&
                    latestSettingTime.checkInOpen
                ) {
                                        
                    await prisma.checkIn.updateMany({
                        where: {
                            checkInDayId: existingCheckInDay.id,
                            type: {
                                in: ["NOT_CHECKED_IN", "REQUEST_FOR_CHECK_IN"]
                            },
                            attendTime: null,
                        },
                        data: {
                            type: "ABSENT",
                        },
                    });
                }                

                if (
                    dayOfWeek >= latestSettingTime.checkInStartDay &&
                    dayOfWeek <= latestSettingTime.checkInEndDay &&
                    hours >= latestSettingTime.checkInStartTime &&
                    hours < latestSettingTime.checkInEndTime &&
                    latestSettingTime.checkInOpen
                ) {                    
                    await prisma.checkIn.updateMany({
                        where: {
                            checkInDayId: existingCheckInDay.id,
                            type: "CLOSED_FOR_CHECK_IN",
                        },
                        data: {
                            type: "NOT_CHECKED_IN",
                            reason: null,
                        },
                    });
                }
            } else {
                const skipDay = await prisma.skipDay.findFirst({
                    where: {
                        date: {
                            gte: new Date(
                                dateNow.getFullYear(),
                                dateNow.getMonth(),
                                dateNow.getDate(),
                                0,
                                0,
                                0
                            ),
                            lt: new Date(
                                dateNow.getFullYear(),
                                dateNow.getMonth(),
                                dateNow.getDate() + 1,
                                0,
                                0,
                                0
                            ),
                        },
                    },
                });

                if (skipDay) {
                    const checkInDay = await prisma.checkInDay.create({
                        data: {
                            dateTime: startOfToday,
                        },
                    });

                    const allUsers = await prisma.user.findMany({
                        select: {
                            id: true,
                            partyListId: true,
                        },
                    });

                    const checkIns = allUsers.map((user) => ({
                        attendTime: startOfToday,
                        type: skipDay.type,
                        reason: skipDay.reason,
                        userId: user.id,
                        checkInDayId: checkInDay.id,
                    }));

                    await prisma.checkIn.createMany({
                        data: checkIns,
                    });
                } else {
                    const checkInDay = await prisma.checkInDay.create({
                        data: {
                            dateTime: startOfToday,
                        },
                    });

                    const allUsers = await prisma.user.findMany({
                        select: {
                            id: true,
                            partyListId: true,
                        },
                    });

                    let checkIns;

                    if (latestSettingTime && !latestSettingTime.checkInOpen) {
                        checkIns = allUsers.map((user) => ({
                            attendTime: startOfToday,
                            type: "CLOSED_FOR_CHECK_IN",
                            reason: "ระบบปิด",
                            userId: user.id,
                            checkInDayId: checkInDay.id,
                        }));
                    } else {
                        checkIns = allUsers.map((user) => ({
                            attendTime: null,
                            type: "CLOSED_FOR_CHECK_IN",
                            reason: `เปิดระบบเวลา ${latestSettingTime.checkInStartTime} นาฬิกา`,
                            userId: user.id,
                            checkInDayId: checkInDay.id,
                        }));
                    }

                    await prisma.checkIn.createMany({
                        data: checkIns,
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error checking or adding CheckInDay:", error);
    }
};

const scheduleCronJobs = async () => {
    try {
        cron.schedule('* * * * *', async () => {
            await checkAndAddCheckInDay();
        });        

    } catch (error) {
        console.error("Error scheduling cron jobs:", error);
    }
};

module.exports = scheduleCronJobs;


