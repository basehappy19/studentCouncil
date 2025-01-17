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
                          },
                      },
                      {
                          bio: {
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
                                skill: {
                                    include: {
                                        icon: true,
                                    },
                                },
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
                                skill: {
                                    include: {
                                        icon: true,
                                    },
                                },
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

        if (!partyListId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            });
        }

        const partyList = await prisma.partyList.update({
            where: {
                id: partyListId,
            },
            data: {
                support: {
                    increment: 1,
                },
            },
        });
        res.status(200).json({
            message: `ส่งกำลังใจให้ ${partyList.nickName} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.SendMessage = async (req, res, next) => {
    try {
        const { partyListId, message } = req.body;

        if (!partyListId) {
            return res.json({
                message: "เกิดปัญหาบางอย่างกับเซิร์ฟเวอร์",
                type: "error",
            });
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
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

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
                                skill: {
                                    include: {
                                        icon: true,
                                    },
                                },
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

exports.UpdateBioPartyList = async (req, res, next) => {
    try {
        const { shortMessage, messageToStudent, classroom } = req.body;

        const partyListId = req.user.partyList.id;

        await prisma.partyList.update({
            where: { id: partyListId },
            data: {
                bio: {
                    update: {
                        shortMessage,
                        messageToStudent,
                        classroom,
                    },
                },
            },
        });

        res.status(201).json({
            message: `แก้ไขข้อมูลเรียบร้อย`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddExperiencePartyList = async (req, res, next) => {
    try {
        const { title } = req.body;
        const partyListId = req.user.partyList.id;

        const partyList = await prisma.partyList.findUnique({
            where: { id: partyListId },
            include: { bio: true },
        });

        if (!partyList || !partyList.bio) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลไบโอสำหรับผู้สมัคร`,
                type: `error`,
            });
        }

        const experience = await prisma.experience.create({
            data: {
                title,
            },
        });

        const newExperience = await prisma.experienceOwnPartyList.create({
            data: {
                experienceId: experience.id,
                bioId: partyList.bio.id,
            },
        });

        res.status(201).json({
            data: newExperience,
            message: `เพิ่ม ${title} ลงในโปรไฟล์ผลงานเรียบร้อย`,
            type: `success`,
        });
    } catch (e) {
        console.error(e);
        e.status = 400;
        next(e);
    }
};

exports.UpdateExperiencePartyList = async (req, res, next) => {
    try {
        const { experienceId, title } = req.body;
        const partyListId = req.user.partyList.id;

        const partyList = await prisma.partyList.findUnique({
            where: { id: partyListId },
            include: { bio: true },
        });

        if (!partyList || !partyList.bio) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลไบโอสำหรับผู้สมัคร`,
                type: `error`,
            });
        }

        const experience = await prisma.experienceOwnPartyList.findFirst({
            where: {
                experienceId: experienceId,
                bioId: partyList.bio.id,
            },
            include: { experience: true },
        });

        if (!experience) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลนี้ในไบโอ`,
                type: `error`,
            });
        }

        await prisma.experience.update({
            where: { id: experienceId },
            data: { title },
        });

        res.status(201).json({
            message: `แก้ไขผลงานเรียบร้อย`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.DeleteExperiencePartyList = async (req, res, next) => {
    try {
        const { experienceId } = req.body;
        const partyListId = req.user.partyList.id;

        const partyList = await prisma.partyList.findUnique({
            where: { id: partyListId },
            include: { bio: true },
        });

        if (!partyList || !partyList.bio) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลไบโอสำหรับผู้สมัคร`,
                type: `error`,
            });
        }

        const experience = await prisma.experienceOwnPartyList.findFirst({
            where: {
                experienceId: experienceId,
                bioId: partyList.bio.id,
            },
            include: { experience: true },
        });

        if (!experience) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลนี้ในไบโอ`,
                type: `error`,
            });
        }

        await prisma.experienceOwnPartyList.deleteMany({
            where: {
                experienceId: experienceId,
                bioId: partyList.bio.id,
            },
        });

        await prisma.experience.delete({
            where: { id: experienceId },
        });

        res.status(200).json({
            message: `ลบผลงานเรียบร้อยแล้ว`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddContact = async (req, res, next) => {
    try {
        const { username, link, platformId } = req.body;
        const partyListId = req.user.partyList.id;

        const partyList = await prisma.partyList.findUnique({
            where: { id: partyListId },
            include: { contacts: true },
        });

        if (!partyList) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลไบโอสำหรับผู้สมัคร`,
                type: `error`,
            });
        }

        const platform = await prisma.platform.findUnique({
            where: { id: platformId },
        });

        if (!platform) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลแพลตฟอร์มนี้`,
                type: `error`,
            });
        }

        const existingContact = await prisma.contact.findUnique({
            where: {
                partyListId_platformId: {
                    partyListId,
                    platformId,
                },
            },
        });

        if (existingContact) {
            return res.status(200).json({
                message: `มีช่องทางติดต่อนี้อยู่แล้ว`,
                type: `error`,
            });
        }

        const contact = await prisma.contact.create({
            include: {
                platform: true,
            },
            data: {
                username,
                link,
                platformId,
                partyListId,
            },
        });

        return res.status(201).json({
            message: `เพิ่มช่องทางการติดต่อเรียบร้อยแล้ว`,
            type: `success`,
            data: contact,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.UpdateContact = async (req, res, next) => {
    try {
        const { id, username, link } = req.body;
        const partyListId = req.user.partyList.id;

        const existingContact = await prisma.contact.findUnique({
            where: { id },
            include: { partyList: true },
        });

        if (!existingContact || existingContact.partyListId !== partyListId) {
            return res.status(404).json({
                message: `ไม่พบช่องทางการติดต่อ`,
                type: `error`,
            });
        }

        const updatedContact = await prisma.contact.update({
            where: { id },
            data: {
                username,
                link,
            },
            include: {
                platform: true,
            },
        });

        return res.status(201).json({
            message: `อัพเดทช่องทางการติดต่อเรียบร้อยแล้ว`,
            type: `success`,
            data: updatedContact,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.RemoveContact = async (req, res, next) => {
    try {
        const { id } = req.body;
        const partyListId = req.user.partyList.id;

        const existingContact = await prisma.contact.findUnique({
            where: { id },
            include: { partyList: true },
        });

        if (!existingContact || existingContact.partyListId !== partyListId) {
            return res.status(404).json({
                message: `ไม่พบช่องทางการติดต่อ`,
                type: `error`,
            });
        }

        await prisma.contact.delete({
            where: { id },
        });

        return res.status(200).json({
            message: `ลบช่องทางการติดต่อเรียบร้อยแล้ว`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AllPlatforms = async (req, res, next) => {
    try {
        const platforms = await prisma.platform.findMany();

        res.status(200).send(platforms);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AllSkills = async (req, res, next) => {
    try {
        const skills = await prisma.skill.findMany();

        res.status(200).send(skills);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddSkillInPartyList = async (req, res, next) => {
    try {
        const { skillId } = req.body;
        const bioId = req.user.partyList.bioId;

        const bio = await prisma.bio.findUnique({
            where: { id: bioId },
        });

        if (!bio) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลไบโอ`,
                type: `error`,
            });
        }

        const skillCount = await prisma.skillOwnPartyList.count({
            where: { bioId },
        });

        if (skillCount >= 3) {
            return res.status(200).json({
                message: `สามารถเลือกความสามารถพิเศษได้แค่ 3 อย่าง`,
                type: `error`,
            });
        }

        const skill = await prisma.skill.findUnique({
            where: { id: skillId },
        });

        if (!skill) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลความสามารถพิเศษ`,
                type: `error`,
            });
        }
        const existingSkill = await prisma.skillOwnPartyList.findUnique({
            where: {
                skillId_bioId: {
                    skillId,
                    bioId,
                },
            },
        });
        
        if (existingSkill) {
            return res.status(200).json({
                message: `มีความสามารถพิเศษนี้อยู่แล้ว`,
                type: `error`,
            });
        }

        const skillLink = await prisma.skillOwnPartyList.create({
            include: {
                skill: {
                    include: {
                        icon: true,
                    }
                },

            },
            data: {
                skillId,
                bioId,
            },
        });

        return res.status(201).json({
            message: `เพิ่มความสามารถพิเศษสำเร็จ`,
            type: `success`,
            data: skillLink,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.RemoveSkillInPartyList = async (req, res, next) => {
    try {
        const { skillId } = req.body;
        const bioId = req.user.partyList.bioId;

        const existingSkill = await prisma.skillOwnPartyList.findUnique({
            include: {
                skill: {
                    include: {
                        icon: true,
                    }
                },

            },
            where: {
                skillId_bioId: {
                    skillId,
                    bioId,
                },
            },
        });


        if (!existingSkill) {
            return res.status(404).json({
                message: `ไม่พบข้อมูลความสามารถพิเศษในผู้สมัครคนนี้`,
                type: `error`,
            });
        }

        await prisma.skillOwnPartyList.delete({
            where: {
                skillId_bioId: {
                    skillId,
                    bioId,
                },
            },
        });

        return res.status(201).json({
            message: `ลบความสามารถพิเศษสำเร็จ`,
            type: `success`,
        });
    } catch (e) {
        e.status = 404;
        next(e);
    }
};
