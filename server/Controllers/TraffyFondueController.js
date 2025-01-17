const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getLocations = async (req, res, next) => {
    try {
        const { search } = req.query;
        const searchFilter = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                      {
                          subLocations: {
                              some: {
                                  name: {
                                      contains: search,
                                  },
                              },
                          },
                      },
                      {
                          subLocations: {
                              some: {
                                  rooms: {
                                      some: {
                                          name: {
                                              contains: search,
                                          },
                                      },
                                  },
                              },
                          },
                      },
                  ].filter(Boolean),
              }
            : {};

        const locations = await prisma.location.findMany({
            where: searchFilter,
            include: {
                subLocations: {
                    include: {
                        rooms: {
                            include: {
                                problems: {
                                    include: {
                                        problem: {
                                            select: {
                                                status: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        problems: {
                            include: {
                                problem: {
                                    select: {
                                        status: true,
                                    },
                                },
                            },
                        },
                    },
                },
                problems: {
                    include: {
                        problem: {
                            select: {
                                status: true,
                            },
                        },
                    },
                },
            },
        });

        const countProblemStatus = (problems) => {
            const statusCount = {
                PENDING: 0,
                IN_PROGRESS: 0,
                RESOLVED: 0,
            };

            problems.forEach((problem) => {
                statusCount[problem.problem.status] =
                    (statusCount[problem.problem.status] || 0) + 1;
            });

            return {
                ...statusCount,
                totalProblems:
                    statusCount.PENDING +
                    statusCount.IN_PROGRESS +
                    statusCount.RESOLVED,
            };
        };

        const result = locations.map((location) => {
            const locationStatusCount = countProblemStatus(location.problems);

            const subLocations = location.subLocations.map((subLocation) => {
                const subLocationStatusCount = countProblemStatus(
                    subLocation.problems
                );

                const rooms = subLocation.rooms.map((room) => {
                    const roomStatusCount = countProblemStatus(room.problems);

                    return {
                        ...room,
                        stats: roomStatusCount,
                    };
                });

                return {
                    ...subLocation,
                    stats: subLocationStatusCount,
                    totalProblems: subLocationStatusCount.totalProblems,
                    rooms,
                };
            });

            return {
                ...location,
                stats: locationStatusCount,
                totalProblems: locationStatusCount.totalProblems,
                subLocations,
            };
        });

        res.status(200).json(result);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.getProblems = async (req, res, next) => {
    try {
        const { search } = req.query;
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
                      {
                        location: {
                            location: {
                                name: {
                                    contains: search,
                                },
                            }
                        }
                      },
                      {
                        location: {
                            subLocation: {
                                name: {
                                    contains: search,
                                },
                            }
                        }
                      },
                      {
                        location: {
                            room: {
                                name: {
                                    contains: search,
                                },
                            }
                        }
                      }
                  ].filter(Boolean),
              }
            : {};

        const problems = await prisma.problem.findMany({
            where: searchFilter,
            include: {
                solution: {
                    include: {
                        resolvedImages: true,
                    },
                },
                reportedImages: true,
                location: {
                    include: {
                        location: true,
                        subLocation: true,
                        room: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).send(problems);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.ReportProblem = async (req, res, next) => {
    try {
        const {
            locationId,
            subLocationId,
            roomId,
            studentId,
            issueTitle,
            issueDescription,
        } = req.body;

        if (!locationId || !issueTitle || !issueDescription) {
            return res
                .status(400)
                .json({ message: "กรุณากรอกให้ครบถ้วน", type: `error` });
        }

        await prisma.problem.create({
            data: {
                title: issueTitle,
                description: issueDescription,
                reportByStudentId: isNaN(parseInt(studentId))
                    ? undefined
                    : parseInt(studentId),
                reportedImages: {
                    create: req.files.map((image) => ({
                        path: `${req.uploadTimestamp}/${image.filename}`,
                    })),
                },
                location: {
                    create: {
                        locationId: isNaN(parseInt(locationId))
                            ? undefined
                            : parseInt(locationId),
                        subLocationId: isNaN(parseInt(subLocationId))
                            ? undefined
                            : parseInt(subLocationId),
                        roomId: isNaN(parseInt(roomId))
                            ? undefined
                            : parseInt(roomId),
                    },
                },
            },
        });

        return res.status(201).json({
            message: `แจ้งปัญหา ${issueTitle} เรียบร้อย`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
