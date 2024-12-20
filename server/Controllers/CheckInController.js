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

exports.CheckIn = async (req, res, next) => {
    try {
        const { type, reason } = req.body;
        const id = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res
                .json({ message: "ไม่พบข้อมูลผู้ใช้", type: "error" })
                .status(404);
        }

        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay();
        const hours = dateNow.getHours();
        attendTime = new Date();

        const startOfToday = new Date(
            dateNow.getFullYear(),
            dateNow.getMonth(),
            dateNow.getDate(),
            0,
            0,
            0
        );

        const day = await prisma.checkInDay.findFirst({
            where: {
                dateTime: startOfToday,
            },
        });

        const checkInRecord = await prisma.checkIn.findFirst({
            where: {
                checkInDayId: day.id,
                userId: id,
            },
        });

        const requestCheckIn = await prisma.checkInRequest.findFirst({
            where: {
                checkInDayId: day.id,
                userId: id,
            },
        });

        if (
            requestCheckIn ||
            checkInRecord.type === "NORMAL" ||
            checkInRecord.type === "SICK_LEAVE" ||
            checkInRecord.type === "PERSONAL_LEAVE" ||
            checkInRecord.type === "ABSENT"
        ) {
            return res.json({
                message: "เช็คอินซ้ำไม่ได้",
                type: "error",
            });
        }

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

        if (
            checkInRecord.type === "REQUEST_FOR_CHECK_IN" &&
            dayOfWeek >= latestSettingTime.checkInStartDay &&
            dayOfWeek < latestSettingTime.checkInEndDay &&
            hours >= latestSettingTime.requestStartTime &&
            hours < latestSettingTime.requestEndTime &&
            !requestCheckIn
        ) {
            await prisma.checkInRequest.create({
                data: {
                    checkInDayId: day.id,
                    userId: id,
                    timeRequested: dateNow,
                },
            });
            await prisma.checkIn.update({
                data: {
                    attendTime: attendTime,
                },
                where: {
                    id: checkInRecord.id,
                },
            });

            return res.json({
                message: "ยื่นคำขอลืมเช็คอินเรียบร้อยแล้ว",
                type: "success",
            });
        }

        if (
            dayOfWeek < latestSettingTime.checkInStartDay ||
            dayOfWeek > latestSettingTime.checkInEndDay ||
            hours < latestSettingTime.checkInStartTime ||
            hours >= latestSettingTime.checkInEndTime
        ) {
            return res.json({ message: "ปิดให้เช็คอินแล้ว", type: "error" });
        }

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

        await prisma.checkIn.update({
            where: {
                id: checkInRecord.id,
            },
            data: {
                type: type,
                reason: reason,
                attendTime: attendTime,
            },
        });

        res.status(201).json({
            message: `เช็คอินเรียบร้อยแล้ว ${formattedDate}`,
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
            where: {
                id: isNaN(parseInt(id)) ? undefined : parseInt(id),
            },
        });
        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay();
        const hours = dateNow.getHours();

        const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

        if (!user) {
            return res
                .status(404)
                .json({ message: "ไม่พบข้อมูลผู้ใช้นี้", type: "error" });
        }
        const day = await prisma.checkInDay.findFirst({
            where: {
                dateTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        const checked = await prisma.checkIn.findFirst({
            select: {
                id: true,
                type: true,
                reason: true,
                attendTime: true,
            },
            where: {
                user: {
                    id: user.id,
                },
                checkInDayId: day.id,
            },
        });

        const requestCheckIn = await prisma.checkInRequest.findFirst({
            where: {
                user: {
                    id: user.id,
                },
                checkInDayId: day.id,
            },
        });

        if (checked.type !== "ABSENT") {
            if (requestCheckIn && requestCheckIn.status === "PENDING") {
                return res.status(200).json({
                    message: "รออนุมัติคำขอลืมเช็คอิน",
                    attendTime: checked.attendTime,
                    reason: checked.reason,
                    type: "REQUEST_FOR_CHECK_IN",
                });
            }
            if (requestCheckIn && requestCheckIn.status === "REJECTED") {
                return res.status(200).json({
                    message: "คำขอลืมเช็คอินถูกปฏิเสธ",
                    attendTime: checked.attendTime,
                    reason: checked.reason,
                    type: "ABSENT",
                });
            }
        }
        if (checked) {
            switch (checked.type) {
                case "NORMAL":
                    return res.status(200).json({
                        message: "คุณได้เช็คอินแล้ววันนี้",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "NORMAL",
                    });
                case "SICK_LEAVE":
                    return res.status(200).json({
                        message: "เช็คอินแล้ววันนี้ (ลาป่วย)",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "SICK_LEAVE",
                    });
                case "PERSONAL_LEAVE":
                    return res.status(200).json({
                        message: "เช็คอินแล้ววันนี้ (ลากิจ)",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "PERSONAL_LEAVE",
                    });
                case "NOT_CHECKED_IN":
                    return res.status(200).json({
                        message: "ยังไม่ได้เช็คอินวันนี้",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "NOT_CHECKED_IN",
                    });
                case "ABSENT":
                    return res.status(200).json({
                        message: "ขาด",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "ABSENT",
                    });
                case "REQUEST_FOR_CHECK_IN":
                    return res.status(200).json({
                        message: "ไม่ได้เช็คอิน (ยื่นลืมเช็คอิน)",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "REQUEST_FOR_CHECK_IN",
                    });
                case "FORGOT_TO_CHECK_IN":
                    return res.status(200).json({
                        message: "เช็คอินแล้ววันนี้ (ลืมเช็คอิน)",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "FORGOT_TO_CHECK_IN",
                    });
                case "HOLIDAY":
                    return res.status(200).json({
                        message: "วันหยุด",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "HOLIDAY",
                    });
                case "CLOSED_FOR_CHECK_IN":
                    return res.status(200).json({
                        message: "ปิดระบบเช็คอิน",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "CLOSED_FOR_CHECK_IN",
                    });

                default:
                    return res.status(200).json({
                        message: "ขาด",
                        attendTime: checked.attendTime,
                        reason: checked.reason,
                        type: "ABSENT",
                    });
            }
        }

        const latestSettingTime = await prisma.setting.findFirst({
            select: {
                id: true,
                checkInOpen: true,
                checkInStartTime: true,
                checkInEndTime: true,
                checkInStartDay: true,
                checkInEndDay: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (
            dayOfWeek < latestSettingTime.checkInStartDay ||
            dayOfWeek > latestSettingTime.checkInEndDay ||
            hours < latestSettingTime.checkInStartTime ||
            hours >= latestSettingTime.checkInEndTime ||
            !latestSettingTime.checkInOpen
        ) {
            return res.status(200).json({
                message: "ปิดให้เช็คอินแล้ว",
                attendTime: null,
                reason: null,
                type: "CLOSED_FOR_CHECK_IN",
            });
        }

        res.status(200).json({
            message: "ยังไม่ได้เช็คอินวันนี้",
            attendTime: null,
            reason: null,
            type: "NOT_CHECKED_IN",
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

exports.RequestCheckIns = async (req, res, next) => {
    try {
        const dateNow = new Date();

        const startOfToday = new Date(
            dateNow.getFullYear(),
            dateNow.getMonth(),
            dateNow.getDate(),
            0,
            0,
            0
        );

        const day = await prisma.checkInDay.findFirst({
            where: {
                dateTime: startOfToday,
            },
        });

        if (!day) {
            return res.status(200).json({
                count: 0,
                requests: [],
            });
        }

        const requests = await prisma.checkInRequest.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        fullName: true,
                        displayName: true,
                        profile_image_full: true,
                        profile_image_128x128: true,
                        order: true,
                        sid: true,
                        partyList: {
                            select: {
                                id: true,
                                fullName: true,
                                nickName: true,
                                profile_image_full: true,
                                profile_image_128x128: true,
                                roles: {
                                    select: {
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                checkInDayId: day.id,
                status: "PENDING",
            },
        });

        res.status(200).json({
            count: requests.length,
            requests: requests,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.ActionRequestCheckIn = async (req, res, next) => {
    try {
        const { requestId, status } = req.body;

        const dateNow = new Date();
        const dayOfWeek = dateNow.getDay();
        const hours = dateNow.getHours();

        const latestSettingTime = await prisma.setting.findFirst({
            select: {
                id: true,
                checkInOpen: true,
                checkInStartTime: true,
                checkInEndTime: true,
                checkInStartDay: true,
                checkInEndDay: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const requestRecord = await prisma.checkInRequest.findFirst({
            where: {
                id: requestId,
            },
        });

        if (
            requestRecord &&
            requestRecord.status === "PENDING" &&
            dayOfWeek >= latestSettingTime.checkInStartDay &&
            dayOfWeek < latestSettingTime.checkInEndDay &&
            hours >= latestSettingTime.checkInStartTime &&
            hours < latestSettingTime.checkInEndTime
        ) {
            const checkInDay = await prisma.checkInDay.findFirst({
                where: {
                    id: requestRecord.checkInDayId,
                },
                include: {
                    checkIns: {
                        where: {
                            userId: requestRecord.userId,
                        },
                    },
                },
            });

            if (checkInDay && checkInDay.checkIns.length > 0) {
                await prisma.checkInRequest.update({
                    data: {
                        status: status,
                        checkInDay: {
                            update: {
                                checkIns: {
                                    update: {
                                        data: {
                                            type:
                                                status === "APPROVED"
                                                    ? "FORGOT_TO_CHECK_IN"
                                                    : "ABSENT",
                                            reason:
                                                status === "APPROVED"
                                                    ? null
                                                    : "คำขอลืมเช็คอินถูกปฏิเสธ",
                                            attendTime:
                                                status === "APPROVED"
                                                    ? undefined
                                                    : null,
                                        },
                                        where: {
                                            id: checkInDay.checkIns[0].id,
                                            userId: requestRecord.userId,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    where: {
                        id: requestId,
                        userId: requestRecord.userId,
                    },
                });

                return res.json({
                    message: "ยืนยันคำขอลืมเช็คอินเรียบร้อย",
                    type: "success",
                });
            } else {
                return res.json({
                    message: "ไม่สามารถยืนยันคำขอลืมเช็คอินได้",
                    type: "error",
                });
            }
        } else {
            return res.json({
                message: "ไม่สามารถยืนยันคำขอได้ หมดเวลาช่วงยื่นคำขอ",
                type: "error",
            });
        }
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.RequestCheckInExist = async (req, res) => {
    try {
        const id = req.user.id;

        const user = await prisma.user.findFirst({
            where: {
                id: isNaN(parseInt(id)) ? undefined : parseInt(id),
            },
        });
        const dateNow = new Date();

        const startOfDay = new Date(dateNow.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateNow.setHours(23, 59, 59, 999));

        if (!user) {
            return res
                .status(404)
                .json({ message: "ไม่พบข้อมูลผู้ใช้นี้", type: "error" });
        }

        const day = await prisma.checkInDay.findFirst({
            where: {
                dateTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        const requestCheckIn = await prisma.checkInRequest.findFirst({
            where: {
                user: {
                    id: user.id,
                },
                checkInDayId: day.id,
                status: "PENDING",
            },
        });
        if (!requestCheckIn) {
            return res.status(200).send(null);
        }
        res.status(200).send(requestCheckIn);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};
