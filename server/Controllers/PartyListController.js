const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ValidateRequiredFields = require("../Functions/ValidateRequiredFields");

/**
 * Get all party lists with search filter
 */
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
        res.status(200).json(partyLists);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get specific party list by ID
 */
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

        if (!partyList) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสมาชิก", type: "error" });
        }

        res.status(200).json(partyList);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Increment support count for a party list
 */
exports.SupportPartyList = async (req, res, next) => {
    try {
        const { partyListId } = req.body;

        if (!partyListId) {
            return res.status(400).json({
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

/**
 * Send a message to a party list
 */
exports.SendMessage = async (req, res, next) => {
    try {
        const { partyListId, message } = req.body;

        if (!partyListId || !message) {
            return res.status(400).json({
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
                type: "error",
            });
        }

        const partyList = await prisma.partyList.findFirst({
            where: {
                id: partyListId,
            },
        });

        if (!partyList) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสมาชิก", type: "error" });
        }

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

/**
 * Get party lists shown on the home page
 */
exports.HomePagePartyLists = async (req, res, next) => {
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
        res.status(200).json(partyLists);
    } catch (e) {
        e.status = 500;
        next(e);
    }
};

/**
 * Add a new party list (Admin only)
 */
exports.AddPartyList = async (req, res, next) => {
    try {
        // Authorization check
        if (req.user.accessId !== 3) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์เพิ่มบัญชีรายชื่อ", type: "error" });
        }

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
            lastName: "Last Name",
            nickName: "Nick Name",
            shortMessage: "Short Message",
            classroom: "Classroom",
            messageToStudent: "Message To Student",
            rank: "Rank",
        };

        const errorMessage = ValidateRequiredFields(req.body, requiredFields);

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
                    create: {
                        shortMessage,
                        classroom,
                        messageToStudent,
                    }
                },
                rank,
                profileImg,
                showInHomepage,
            },
        });
        
        res.status(201).json({
            message: `เพื่ม ${firstName} ${middleName ? middleName + ' ' : ''}${lastName} ในบัญชีรายชื่อสมาชิกแล้ว`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Update bio of a party list
 */
exports.UpdateBioPartyList = async (req, res, next) => {
    try {
        const { shortMessage, messageToStudent, classroom } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีบัญชีรายชื่อสำหรับแก้ไขข้อมูล", type: "error" });
        }

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

        res.status(200).json({
            message: `แก้ไขข้อมูลเรียบร้อย`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Add an experience to a party list profile
 */
exports.AddExperiencePartyList = async (req, res, next) => {
    try {
        const { title } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้", type: "error" });
        }

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
        e.status = 400;
        next(e);
    }
};

/**
 * Update an experience entry
 */
exports.UpdateExperiencePartyList = async (req, res, next) => {
    try {
        const { experienceId, title } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้", type: "error" });
        }

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

        res.status(200).json({
            message: `แก้ไขผลงานเรียบร้อย`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Delete an experience entry
 */
exports.DeleteExperiencePartyList = async (req, res, next) => {
    try {
        const { experienceId } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์ลบข้อมูลนี้", type: "error" });
        }

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

/**
 * Add a contact method
 */
exports.AddContact = async (req, res, next) => {
    try {
        const { username, link, platformId } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้", type: "error" });
        }

        const partyListId = req.user.partyList.id;

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
            return res.status(400).json({
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

/**
 * Update a contact method
 */
exports.UpdateContact = async (req, res, next) => {
    try {
        const { id, username, link } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้", type: "error" });
        }

        const partyListId = req.user.partyList.id;

        const existingContact = await prisma.contact.findUnique({
            where: { id },
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

        return res.status(200).json({
            message: `อัพเดทช่องทางการติดต่อเรียบร้อยแล้ว`,
            type: `success`,
            data: updatedContact,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Remove a contact method
 */
exports.RemoveContact = async (req, res, next) => {
    try {
        const { id } = req.body;
        
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์ลบข้อมูลนี้", type: "error" });
        }

        const partyListId = req.user.partyList.id;

        const existingContact = await prisma.contact.findUnique({
            where: { id },
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

/**
 * Get all available platforms
 */
exports.AllPlatforms = async (req, res, next) => {
    try {
        const platforms = await prisma.platform.findMany();
        res.status(200).json(platforms);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get all available skills
 */
exports.AllSkills = async (req, res, next) => {
    try {
        const skills = await prisma.skill.findMany();
        res.status(200).json(skills);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Add a skill to a party list
 */
exports.AddSkillInPartyList = async (req, res, next) => {
    try {
        const { skillId } = req.body;
        
        if (!req.user.partyList || !req.user.partyList.bioId) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์แก้ไขข้อมูลนี้", type: "error" });
        }

        const bioId = req.user.partyList.bioId;

        const skillCount = await prisma.skillOwnPartyList.count({
            where: { bioId },
        });

        if (skillCount >= 3) {
            return res.status(400).json({
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
            return res.status(400).json({
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

/**
 * Remove a skill from a party list
 */
exports.RemoveSkillInPartyList = async (req, res, next) => {
    try {
        const { skillId } = req.body;
        
        if (!req.user.partyList || !req.user.partyList.bioId) {
            return res.status(403).json({ message: "คุณไม่มีสิทธิ์ลบข้อมูลนี้", type: "error" });
        }

        const bioId = req.user.partyList.bioId;

        const existingSkill = await prisma.skillOwnPartyList.findUnique({
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

        return res.status(200).json({
            message: `ลบความสามารถพิเศษสำเร็จ`,
            type: `success`,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get messages sent to the current user's party list
 */
exports.getMessages = async (req, res, next) => {
    try {
        if (!req.user.partyList) {
            return res.status(403).json({ message: "คุณไม่มีบัญชีรายชื่อสำหรับดูข้อความ", type: "error" });
        }

        const partyList = req.user.partyList;

        const messages = await prisma.messageToPartyList.findMany({
            where: {
                partyListId: partyList.id,
            },
        });

        res.status(200).json(messages);
    } catch (e) {
        e.status = 400;
        next(e);
    }
}
