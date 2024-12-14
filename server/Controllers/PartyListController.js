const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AllPartyLists = async (req, res, next) => {
    try {
        const { search } = req.query;
        const searchFilter = search
            ? {
                  OR: [
                      {
                          fullName: { contains: search },
                      },
                      {
                          nickName: { contains: search },
                      },
                      {
                          rank: { contains: search },
                      },
                      {
                          roles: {
                              some: {
                                  role: { name: { contains: search } },
                              },
                          },
                      },
                      {
                          bio: {
                              classroom: { contains: search },
                              skills: {
                                  some: {
                                      skill: { name: { contains: search } },
                                  },
                              },
                          },
                      },
                  ].filter(Boolean),
              }
            : {};
        const partyLists = await prisma.partyList.findMany({
            where: searchFilter,
            include: {
                contacts: {
                    include: {
                        platform: true,
                    },
                },
                roles: {
                    include: {
                        role: true,
                    },
                },
                bio: {
                    include: {
                        skills: {
                            include: {
                                skill: true,
                            },
                        },
                        experiences: {
                            include: {
                                experience: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                order: "asc",
            },
        });
        res.status(200).send(partyLists);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
exports.PartyList = async (req, res, next) => {
    try {
        const { id } = req.query;
        const partyList = await prisma.partyList.findFirst({
            where: {
                id: isNaN(parseInt(id)) ? undefined : parseInt(id),
            },
            include: {
                contacts: {
                    include: {
                        platform: true,
                    },
                },
                roles: {
                    include: {
                        role: true,
                    },
                },
                bio: {
                    include: {
                        skills: {
                            include: {
                                skill: true,
                            },
                        },
                        experiences: {
                            include: {
                                experience: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(200).send(partyList);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.SupportPartyList = async (req, res, next) => {
    try {
        const { partyListId } = req.body;

        if(!partyListId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            })
        }

        const partyList = await prisma.partyList.update({
            where: {
                id: partyListId,
            },
            data: {
                support: {
                    increment: 1
                },
            },
        });
        res.status(200).json({
            message: `ส่งกำลังใจให้ ${partyList.nickName} เรียบร้อยแล้ว`,
            type: "success",
        })
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

exports.SendMessage = async (req, res, next) => {
    try {
        const { partyListId, message } = req.body;

        if(!partyListId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            })
        }
        const partyList = await prisma.partyList.findFirst({
            where: {
                id: partyListId,
            },
        });

        await prisma.messageToPartyList.create({
            data: {
                partyListId: partyList.id,
                message: message,
            },
        });
        res.status(200).json({
            message: `ส่งข้อความถึง ${partyList.nickName} เรียบร้อยแล้ว`,
            type: "success",
        })
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

exports.HomePagePartyLists = async (req, res) => {
    try {
        const partyLists = await prisma.partyList.findMany({
            where: {
                showInHomepage: true,
            },
            include: {
                contacts: {
                    include: {
                        platform: true,
                    },
                },
                roles: {
                    include: {
                        role: true,
                    },
                },
                bio: {
                    include: {
                        skills: {
                            include: {
                                skill: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                orderInHomepage: "asc",
            },
        });
        res.status(200).send(partyLists);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
    }
};

exports.AddPartyList = async (req, res, next) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            nickName,
            shortMessage,
            classroom,
            messageToStudent,
            rank,
            profileImg,
            showInHomepage,
        } = req.body;

        const requiredFields = {
            firstName: "First Name",
            middleName: "Middle Name",
            lastName: "Last Name",
            nickName: "Nick Name",
            shortMessage: "Short Message",
            classroom: "Classroom",
            messageToStudent: "Message To Student",
            rank: "Rank",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        await prisma.partyList.create({
            data: {
                firstName,
                middleName,
                lastName,
                nickName,
                bio: {
                    shortMessage,
                    classroom,
                    messageToStudent,
                },
                rank,
                profileImg,
                showInHomepage,
            },
        });
        res.json({
            message: `เพื่ม ${firstName} ${middleName} ${lastName} ในบัญชีรายชื่อสมาชิกแล้ว`,
            type: `success`,
        }).status(201);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
