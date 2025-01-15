const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getLocations = async (req, res, next) => {
    try {
        const locations = await prisma.location.findMany({
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

