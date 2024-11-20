const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllCheckIns = async (req, res) => {
    try {
        const { startDate, endDate, search } = req.query;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const days = await prisma.checkInDay.findMany({
            where: {
                ...(start && end && {
                    dateTime: {
                        gte: start,
                        lte: end,
                    },
                }),
                ...(start && !end && {
                    dateTime: {
                        gte: start,
                    },
                }),
                ...(!start && end && {
                    dateTime: {
                        lte: end,
                    },
                }),
            },
            include: {
                checkIns: {
                    include: {
                        user: {
                            include: {
                                partyList: true,
                            },
                        },
                    },
                    where: {
                        ...(search && {
                            user: {
                                partyList: {
                                    OR: [
                                        { fullName: { contains: search } },
                                        { nickName: { contains: search } },
                                    ],
                                },
                            },
                        }),
                    },
                },
            },
            orderBy: {
                dateTime: "asc",
            },
        });

        const partyLists = await prisma.partyList.findMany({
            select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                nickName: true,
                fullName: true,
                profile_image_128x128: true,
                roles: {
                    select: {
                        role: true,
                    },
                },
            },
        })
        res.status(200).json({ partyLists: partyLists, days: days });
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
};


exports.CheckIn = async (req, res) => {
    try {
        const { type, reason } = req.body;
        const id = req.user.id;

        const user = await prisma.user.findOne({
            id: id,
        });

        if (!user) {
            return res.json({ message: "ไม่พบข้อมูลผู้ใช้", type: "error" });
        }

        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay();
        const hours = dateNow.getHours();

        const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

        const checked = await prisma.checkIn.findFirst({
            userId: user,
            attendTime: {
                gte: startOfDay,
                lte: endOfDay,
            },
        });

        if (checked) {
            return res.json({
                message: "คุณได้เช็คอินแล้ววันนี้",
                type: "error",
            });
        }
        if (dayOfWeek < 1 || dayOfWeek > 5 || hours < 7 || hours >= 9) {
            return res.json({ message: "ปิดให้เช็คอินแล้ว", type: "error" });
        }

        attendTime = new Date();
        const formattedDate = new Intl.DateTimeFormat("th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(attendTime);
        await prisma.checkIn.create({
            data: {
                userId: userId,
                type: type,
                reason: reason,
                attendTime: attendTime,
            },
        });
        res.status(201).json({
            message: `เช็คอินเรียบร้อยแล้ว "${formattedDate}"`,
            type: "success",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};

exports.CheckInStatus = async (req, res) => {
    try {
        const id = req.user.id;

        const user = await prisma.user.findFirst({
            id: id,
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: "ไม่พบข้อมูลผู้ใช้นี้", type: "error" });
        }

        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay();
        const hours = dateNow.getHours();

        const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

        const checked = await CheckIn.findOne({
            userId: userId,
            attendTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        if (checked) {
            return res.status(200).json({
                message: "คุณได้เช็คอินแล้ววันนี้",
                type: "CheckedIn",
            });
        }

        if (dayOfWeek < 1 || dayOfWeek > 5 || hours < 7 || hours >= 9) {
            return res
                .status(200)
                .json({ message: "ปิดให้เช็คอินแล้ว", type: "CheckInClosed" });
        }

        res.status(200).json({
            message: "ยังไม่เช็คอินวันนี้",
            type: "NotChecked",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};
