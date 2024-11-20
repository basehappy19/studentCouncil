const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cron = require('node-cron');

const checkAndAddCheckInDay = async () => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

        const existingCheckInDay = await prisma.checkInDay.findFirst({
            where: {
                dateTime: startOfToday,
            },
        });

        if (!existingCheckInDay) {
            const skipDay = await prisma.skipDay.findFirst({
                where: {
                    date: {
                        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0), // เริ่มต้นวัน
                        lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0), // สิ้นสุดวัน
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
                const latestSetting = await prisma.setting.findFirst({
                    orderBy: {
                        createdAt: "desc",
                    },
                });

                if (latestSetting && !latestSetting.checkInOpen) {
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
                        type: "CLOSED_FOR_CHECK_IN",
                        reason: "ระบบปิด",
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

                    const checkIns = allUsers.map((user) => ({
                        attendTime: null,
                        type: "NOT_CHECKED_IN",
                        reason: null,
                        userId: user.id,
                        checkInDayId: checkInDay.id,
                    }));

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

cron.schedule('0 0 * * *', async () => {
    await checkAndAddCheckInDay();
});

const startAddCheckInDay = async () => {
    try {
        await checkAndAddCheckInDay();
    } catch (error) {
        console.error("Error on server start checkAndAddCheckInDay:", error);
    }
};

module.exports = {
    startAddCheckInDay,
};
