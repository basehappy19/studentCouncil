const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
            },
        });
        res.status(200).send(works);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.UserWorkStatistics = async (req, res, next) => {
    try {
        const id = req.user.id;
        const workPosts = await prisma.work.findMany({
            where: {
                postBy: {
                    id: isNaN(parseInt(id)) ? undefined : parseInt(id),
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
                                userId: isNaN(parseInt(id))
                                    ? undefined
                                    : parseInt(id),
                            },
                        },
                    },
                    {
                        NOT: {
                            postById: isNaN(parseInt(id))
                                ? undefined
                                : parseInt(id),
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

        res.status(200).send(result);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.getWorkForEdit = async (req, res, next) => {
    try {
        const id = req.query;

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
                        id: true,
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
                date: true,
                updatedAt: true,
            },
        });

        if (!work) {
            return res.status(200).send(null);
        }

        work.operators = work.operators.map((operator) => operator.id);
        work.tags = work.tags.map((tag) => tag.id);

        res.status(200).send(work);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.UserWorks = async (req, res, next) => {
    try {
        const { search, page = 1, pageSize = 5, filter = "" } = req.query;
        const id = req.user.id;

        const pageNumber = parseInt(page);
        const size = parseInt(pageSize);

        const skip = (pageNumber - 1) * size;

        const parsedId = isNaN(parseInt(id)) ? undefined : parseInt(id);

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
                    id: parsedId,
                },
            };
        } else if (filter === "participated") {
            whereCondition = {
                NOT: {
                    postById: parsedId,
                },
                operators: {
                    some: {
                        userId: parsedId,
                    },
                },
            };
        } else {
            whereCondition = {
                OR: [
                    {
                        postById: parsedId,
                    },
                    {
                        NOT: {
                            postById: parsedId,
                        },
                        operators: {
                            some: {
                                userId: parsedId,
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
                }),

                prisma.work.count({
                    where: whereCondition,
                }),

                prisma.work.count({
                    where: {
                        postById: parsedId,
                    },
                }),

                prisma.work.count({
                    where: {
                        NOT: {
                            postById: parsedId,
                        },
                        operators: {
                            some: {
                                userId: parsedId,
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
exports.AddWork = async (req, res, next) => {
    try {
        const id = req.user.id;
        const data = req.body;
        const images = req.files;

        const tagIds = JSON.parse(data.tags);
        const operatorIds = JSON.parse(data.operators);

        const existingTags = await prisma.workTag.findMany({
            where: {
                id: {
                    in: tagIds,
                },
            },
        });

        const newTagIds = tagIds.filter(
            (tagId) =>
                !existingTags.some((existingTag) => existingTag.id === tagId)
        );

        const newTags =
            newTagIds.length > 0
                ? await prisma.workTag.createMany({
                      data: newTagIds.map((tagId) => ({ id: tagId })),
                  })
                : [];

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
                    connect: existingTags.map((tag) => ({ id: tag.id })),
                    create: newTags.map((tag) => ({ id: tag.id })),
                },
                operators: {
                    create: {
                        userId: id,
                    },
                    createMany: {
                        data: operatorIds.map((operatorId) => ({
                            userId: operatorId,
                        })),
                    },
                },
            },
        });

        res.status(200).json({
            message: "โพสต์งานเรียบร้อยแล้ว",
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
exports.OptionsForAddWork = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
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
        });

        const tags = await prisma.workTag.findMany({
            select: {
                id: true,
                title: true,
                icon: true,
            },
            orderBy: {
                id: "asc",
            },
        });

        const options = {
            users,
            tags,
        };

        res.status(200).send(options);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
