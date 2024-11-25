const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllCheckIns = async (req, res, next) => {
    try {
        const { startDate, endDate, search } = req.query;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const days = await prisma.checkInDay.findMany({
            where: {
                ...(start &&
                    end && {
                        dateTime: {
                            gte: start,
                            lte: end,
                        },
                    }),
                ...(start &&
                    !end && {
                        dateTime: {
                            gte: start,
                        },
                    }),
                ...(!start &&
                    end && {
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
                                        {
                                            roles: {
                                                some: {
                                                    role: {
                                                        name: {
                                                            contains: search,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        }),
                    },
                },
            },
            orderBy: {
                dateTime: "desc",
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
                user: {
                    select: {
                        id: true,
                        checkIns: {
                            select: {
                                id: true,
                                attendTime: true,
                                checkInDay: {
                                    select: {
                                        dateTime: true,
                                    },
                                },
                            },
                            where: {
                                checkInDay: {
                                    ...(start &&
                                        end && {
                                            dateTime: {
                                                gte: start,
                                                lte: end,
                                            },
                                        }),
                                    ...(start &&
                                        !end && {
                                            dateTime: {
                                                gte: start,
                                            },
                                        }),
                                    ...(!start &&
                                        end && {
                                            dateTime: {
                                                lte: end,
                                            },
                                        }),
                                },
                            },
                        },
                    },
                },
            },
            where: {
                AND: [
                    ...(search
                        ? [
                              {
                                  OR: [
                                      {
                                          fullName: {
                                              contains: search,
                                          },
                                      },
                                      {
                                          nickName: {
                                              contains: search,
                                          },
                                      },
                                      {
                                          roles: {
                                              some: {
                                                  role: {
                                                      name: {
                                                          contains: search,
                                                      },
                                                  },
                                              },
                                          },
                                      },
                                  ],
                              },
                          ]
                        : []),
                    {
                        user: {
                            checkIns: {
                                some: {
                                    checkInDay: {
                                        ...(start &&
                                            end && {
                                                dateTime: {
                                                    gte: start,
                                                    lte: end,
                                                },
                                            }),
                                        ...(start &&
                                            !end && {
                                                dateTime: {
                                                    gte: start,
                                                },
                                            }),
                                        ...(!start &&
                                            end && {
                                                dateTime: {
                                                    lte: end,
                                                },
                                            }),
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            orderBy: {
                order: "asc",
            },
        });

        res.status(200).json({ partyLists: partyLists, days: days });
    } catch (e) {
        e.status = 400;
        next(e);
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
        e.status = 400;
        next(e);
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

exports.CheckInStatistics = async (req, res, next) => {
    try {
        const { search } = req.query;

        const partyLists = await prisma.partyList.findMany({
            select: {
                id: true,
                fullName: true,
                nickName: true,
                profile_image_128x128: true,
                profile_image_full: true,
                roles: {
                    select: {
                        role: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        checkIns: {
                            select: {
                                id: true,
                                attendTime: true,
                                type: true,
                                reason: true,
                                checkInDay: true,
                            },
                        },
                    },
                },
            },
            where: {
                ...(search && {
                    OR: [
                        { fullName: { contains: search } },
                        { nickName: { contains: search } },
                        {
                            roles: {
                                some: {
                                    role: {
                                        name: { contains: search },
                                    },
                                },
                            },
                        },
                    ],
                }),
            },
        });

        const enumTypes = [
            { type: "NORMAL", name: "ปกติ" },
            { type: "SICK_LEAVE", name: "ลาป่วย" },
            { type: "PERSONAL_LEAVE", name: "ลากิจ" },
            { type: "NOT_CHECKED_IN", name: "ไม่ได้เช็คอิน" },
            { type: "ABSENT", name: "ขาด" },
            { type: "FORGOT_TO_CHECK_IN", name: "ลืมเช็คอิน" },
        ];

        const statistics = partyLists.map((party) => {
            const checkIns = party.user?.checkIns || [];
            const days = [...new Set(checkIns.map((c) => c.checkInDay))].length;

            const averageCheckInTime =
                checkIns.reduce((sum, c) => {
                    if (c.attendTime) {
                        const time =
                            new Date(c.attendTime).getHours() * 60 +
                            new Date(c.attendTime).getMinutes();
                        return sum + time;
                    }
                    return sum;
                }, 0) / (checkIns.length || 1);

            const statusCounts = enumTypes.map(({ type, name }) => ({
                type,
                name,
                count: checkIns.filter((c) => c.type === type).length,
            }));

            return {
                id: party.id,
                fullName: party.fullName,
                nickName: party.nickName,
                profile_image_128x128: party.profile_image_128x128,
                profile_image_full: party.profile_image_full,
                roles: party.roles,
                statistics: {
                    days,
                    averageCheckInTime: isNaN(averageCheckInTime)
                        ? "No Valid Check-Ins"
                        : `${Math.floor(averageCheckInTime / 60)}:${Math.floor(
                              averageCheckInTime % 60
                          )
                              .toString()
                              .padStart(2, "0")}`,
                    statusCounts,
                },
            };
        });

        res.status(200).send(statistics);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
