const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all works with search and tag filters
 */
exports.AllWorks = async (req, res, next) => {
    try {
        const { search, tag } = req.query;
        const searchFilter = search
            ? {
                  OR: [
                      {
                          title: { contains: search },
                          description: { contains: search },
                      },
                      {
                          postBy: {
                              fullName: { contains: search },
                          },
                      },
                      {
                          postBy: {
                              partyList: {
                                  nickName: { contains: search },
                              },
                          },
                      },
                      {
                          operators: {
                              some: {
                                  user: {
                                      partyList: {
                                          fullName: {
                                              contains: search,
                                          },
                                      },
                                  },
                              },
                          },
                      },
                      {
                          operators: {
                              some: {
                                  user: {
                                      partyList: {
                                          nickName: {
                                              contains: search,
                                          },
                                      },
                                  },
                              },
                          },
                      },
                      {
                          tags: {
                              some: {
                                  tag: {
                                      title: {
                                          contains: search,
                                      },
                                  },
                              },
                          },
                      },
                  ].filter(Boolean),
              }
            : {};

        const tagFilter = tag
            ? {
                  tags: {
                      some: {
                          tag: {
                              id: {
                                  equals: parseInt(tag),
                              },
                          },
                      },
                  },
              }
            : {};

        const combinedFilter = {
            AND: [searchFilter, tagFilter].filter(Boolean),
        };

        const works = await prisma.work.findMany({
            where: combinedFilter,
            include: {
                postBy: {
                    select: {
                        id: true,
                        fullName: true,
                        displayName: true,
                        profile_image_128x128: true,
                        profile_image_full: true,
                        sid: true,
                        partyList: {
                            select: {
                                id: true,
                                firstName: true,
                                middleName: true,
                                lastName: true,
                                nickName: true,
                                profile_image_128x128: true,
                                profile_image_full: true,
                                roles: {
                                    select: {
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
                operators: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                displayName: true,
                                profile_image_128x128: true,
                                profile_image_full: true,
                                sid: true,
                                partyList: {
                                    select: {
                                        id: true,
                                        firstName: true,
                                        middleName: true,
                                        lastName: true,
                                        fullName: true,
                                        nickName: true,
                                        profile_image_128x128: true,
                                        profile_image_full: true,
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
                },
                images: {
                    select: {
                        id: true,
                        path: true,
                    },
                },
                tags: {
                    select: {
                        id: true,
                        tag: {
                            select: {
                                id: true,
                                title: true,
                                icon: true,
                            },
                        },
                    },
                },
                comments: {
                    select: {
                        id: true,
                        name: true,
                        message: true,
                        like: true,
                        createdAt: true,
                    },
                },
            },
        });
        res.status(200).json(works);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Add a comment to a work
 */
exports.Comment = async (req, res, next) => {
    try {
        const { workId, message } = req.body;

        if (!workId || !message) {
            return res.status(400).json({
                message: "กรุณาเขียนคอมเม้นก่อนส่ง",
                type: "error",
            });
        }

        await prisma.commentInWork.create({
            data: {
                workId,
                message,
            },
        });

        res.status(201).json({
            message: "ส่งคอมเม้นเรียบร้อยแล้ว",
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Like a comment
 */
exports.LikeComment = async (req, res, next) => {
    try {
        const { commentId } = req.body;
        
        const comment = await prisma.commentInWork.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ message: `ไม่พบคอมเม้น หรือคอมเม้นนี้ถูกลบไปแล้ว`, type: `error` })
        }

        await prisma.commentInWork.update({
            data: {
                like: {
                    increment: 1,
                }
            },
            where: {
                id: commentId,
            },
        });
        
        res.status(200).json({ message: `กดถูกใจความคิดเห็นคอมเม้นเรียบร้อยแล้ว`, type: `success` })
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get work statistics for the current user
 */
exports.UserWorkStatistics = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized', type: 'error' });
        }

        const { id } = req.user;
        const parsedId = id;

        const workPosts = await prisma.work.findMany({
            where: {
                postBy: {
                    id: parsedId,
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                postBy: true,
                images: true,
                operators: true,
                tags: true,
                date: true,
                updatedAt: true,
            },
        });

        const workParticipated = await prisma.work.findMany({
            where: {
                AND: [
                    {
                        operators: {
                            some: {
                                userId: parsedId,
                            },
                        },
                    },
                    {
                        NOT: {
                            postById: parsedId,
                        },
                    },
                ],
            },
            select: {
                id: true,
                title: true,
                description: true,
                postBy: true,
                images: true,
                operators: true,
                tags: true,
                date: true,
                updatedAt: true,
            },
        });

        const result = {
            workPostsCount: workPosts.length,
            workParticipatedCount: workParticipated.length,
            totalWorks: workPosts.length + workParticipated.length,
            workPosts: workPosts,
            workParticipated: workParticipated,
        };

        res.status(200).json(result);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get specific work data for editing
 */
exports.getWorkForEdit = async (req, res, next) => {
    try {
        const { id } = req.query;

        const work = await prisma.work.findFirst({
            where: {
                id: isNaN(parseInt(id)) ? undefined : parseInt(id),
            },
            select: {
                id: true,
                title: true,
                description: true,
                postBy: true,
                images: true,
                operators: {
                    select: {
                        userId: true,
                    },
                },
                tags: {
                    select: {
                        tag: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                date: true,
                updatedAt: true,
            },
        });

        if (!work) {
            return res.status(404).json({ message: "Work not found", type: "error" });
        }

        // Map to simpler format for the frontend
        work.operators = work.operators.map((op) => op.userId);
        work.tags = work.tags.map((t) => t.tag.id);

        res.status(200).json(work);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get works relevant to the user (owned or participated)
 */
exports.UserWorks = async (req, res, next) => {
    try {
        const { search, page = 1, pageSize = 5, filter = "" } = req.query;
        
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized', type: 'error' });
        }

        const { id } = req.user;
        const pageNumber = parseInt(page);
        const size = parseInt(pageSize);
        const skip = (pageNumber - 1) * size;

        const searchFilter = search
            ? {
                  OR: [
                      {
                          title: {
                              contains: search,
                          },
                      },
                      {
                          description: {
                              contains: search,
                          },
                      },
                  ].filter(Boolean),
              }
            : {};

        let whereCondition = {};

        if (filter === "owner") {
            whereCondition = {
                postBy: {
                    id: id,
                },
            };
        } else if (filter === "participated") {
            whereCondition = {
                NOT: {
                    postById: id,
                },
                operators: {
                    some: {
                        userId: id,
                    },
                },
            };
        } else {
            whereCondition = {
                OR: [
                    {
                        postById: id,
                    },
                    {
                        NOT: {
                            postById: id,
                        },
                        operators: {
                            some: {
                                userId: id,
                            },
                        },
                    },
                ],
            };
        }

        whereCondition = {
            ...whereCondition,
            ...searchFilter,
        };

        const [works, totalRecords, totalOwned, totalParticipated] =
            await Promise.all([
                prisma.work.findMany({
                    where: whereCondition,
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        postBy: true,
                        images: true,
                        operators: {
                            select: {
                                id: true,
                                user: true,
                            },
                        },
                        tags: {
                            select: {
                                id: true,
                                tag: {
                                    select: {
                                        id: true,
                                        icon: true,
                                    },
                                },
                            },
                        },
                        date: true,
                        updatedAt: true,
                    },
                    skip: skip,
                    take: size,
                    orderBy: {
                        updatedAt: 'desc'
                    }
                }),

                prisma.work.count({
                    where: whereCondition,
                }),

                prisma.work.count({
                    where: {
                        postById: id,
                    },
                }),

                prisma.work.count({
                    where: {
                        NOT: {
                            postById: id,
                        },
                        operators: {
                            some: {
                                userId: id,
                            },
                        },
                    },
                }),
            ]);

        const totalPages = Math.ceil(totalRecords / size);

        res.status(200).json({
            data: works,
            pagination: {
                totalRecords,
                totalPages,
                currentPage: pageNumber,
                pageSize: size,
            },
            additionalData: {
                totalOwned,
                totalParticipated,
                totalWorks: totalOwned + totalParticipated,
            },
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Add a new work
 */
exports.AddWork = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized', type: 'error' });
        }

        const { id } = req.user;
        const data = req.body;
        const images = req.files || [];

        const tagIds = data.tags ? JSON.parse(data.tags) : [];
        const operatorIds = data.operators ? JSON.parse(data.operators) : [];

        // Filter out the current user if they are already in operatorIds to avoid duplication
        const otherOperatorIds = operatorIds.filter(opId => opId !== id);

        await prisma.work.create({
            data: {
                title: data.title,
                description: data.description,
                postBy: {
                    connect: {
                        id,
                    },
                },
                images: {
                    createMany: {
                        data: images.map((file) => ({
                            path: file.filename,
                        })),
                    },
                },
                tags: {
                    connect: tagIds.map((tagId) => ({ id: tagId })),
                },
                operators: {
                    create: [
                        { userId: id }, // Poster is always an operator
                        ...otherOperatorIds.map(opId => ({ userId: opId }))
                    ]
                },
            },
        });

        res.status(201).json({
            message: "โพสต์งานเรียบร้อยแล้ว",
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

/**
 * Get options for creating a work (users and tags)
 */
exports.OptionsForAddWork = async (req, res, next) => {
    try {
        const [users, tags] = await Promise.all([
            prisma.user.findMany({
                select: {
                    id: true,
                    fullName: true,
                    partyList: {
                        select: {
                            id: true,
                            fullName: true,
                            nickName: true,
                            profile_image_128x128: true,
                            profile_image_full: true,
                            roles: {
                                select: {
                                    id: true,
                                    role: true,
                                },
                            },
                            order: true,
                        },
                    },
                },
                orderBy: {
                    partyList: {
                        order: "asc",
                    },
                },
            }),
            prisma.workTag.findMany({
                select: {
                    id: true,
                    title: true,
                    icon: true,
                },
                orderBy: {
                    id: "asc",
                },
            })
        ]);

        res.status(200).json({
            users,
            tags,
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
