const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");
const validateRequiredFields = require("../Functions/ValidateRequiredFields");

exports.AllVotes = async (req, res, next) => {
    try {
        const votes = await prisma.vote.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                refers: {
                    select: {
                        id: true,
                        refer: true,
                    },
                },
                documents: {
                    select: {
                        id: true,
                        document: true,
                    },
                },
                result: {
                    select: {
                        maxAttendees: true,
                        agrees: {
                            select: {
                                id: true,
                                partyList: true,
                            },
                        },
                        disagrees: {
                            select: {
                                id: true,
                                partyList: true,
                            },
                        },
                        abstains: {
                            select: {
                                id: true,
                                partyList: true,
                            },
                        },
                        noVotes: {
                            select: {
                                id: true,
                                partyList: true,
                            },
                        },
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });

        const formattedVotes = votes.map((vote) => {
            const agreeCount = vote.result.agrees.length;
            const disagreeCount = vote.result.disagrees.length;
            const abstainCount = vote.result.abstains.length;
            const noVoteCount = vote.result.noVotes.length;

            const totalPartyListCount =
                agreeCount + disagreeCount + noVoteCount + abstainCount;

            const agreePercentage =
                totalPartyListCount > 0
                    ? ((agreeCount / totalPartyListCount) * 100).toFixed(2)
                    : "0.00";
            const disagreePercentage =
                totalPartyListCount > 0
                    ? ((disagreeCount / totalPartyListCount) * 100).toFixed(2)
                    : "0.00";
            const abstainPercentage =
                totalPartyListCount > 0
                    ? ((abstainCount / totalPartyListCount) * 100).toFixed(2)
                    : "0.00";
            const noVotePercentage =
                totalPartyListCount > 0
                    ? ((noVoteCount / totalPartyListCount) * 100).toFixed(2)
                    : "0.00";

            let voteResult;
            const effectiveTotal = agreeCount + disagreeCount + noVoteCount;

            if (agreeCount > disagreeCount && agreeCount > noVoteCount) {
                voteResult = {
                    type: `Agree`,
                    with: agreeCount,
                    to: Math.max(disagreeCount, noVoteCount),
                    percentage: ((agreeCount / effectiveTotal) * 100).toFixed(
                        2
                    ),
                };
            } else if (
                disagreeCount > agreeCount &&
                disagreeCount > noVoteCount
            ) {
                voteResult = {
                    type: `Disagree`,
                    with: disagreeCount,
                    to: Math.max(agreeCount, noVoteCount),
                    percentage: (
                        (disagreeCount / effectiveTotal) *
                        100
                    ).toFixed(2),
                };
            } else if (
                abstainCount > agreeCount &&
                disagreeCount > noVoteCount
            ) {
                voteResult = {
                    type: `Abstain`,
                    with: abstainCount,
                    to: Math.max(agreeCount, abstainCount),
                    percentage: ((noVoteCount / effectiveTotal) * 100).toFixed(
                        2
                    ),
                };
            } else {
                voteResult = {
                    type: "Tie | no result",
                    with: null,
                    to: null,
                    percentage: null,
                };
            }

            return {
                ...vote,
                result: {
                    ...vote.result,
                    total: {
                        maxAttendees: vote.result.maxAttendees.number,
                        agreeCount,
                        disagreeCount,
                        abstainCount,
                        noVoteCount,
                        totalPartyListCount,
                    },
                    percentages: {
                        agreePercentage,
                        disagreePercentage,
                        abstainPercentage,
                        noVotePercentage,
                    },
                    summary: voteResult,
                },
            };
        });

        res.status(200).send(formattedVotes)
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.getVote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { search } = req.query;

        const searchFilter = search
            ? {
                  OR: [
                      { partyList: { firstName: { contains: search } } },
                      { partyList: { middleName: { contains: search } } },
                      { partyList: { nickName: { contains: search } } },
                      {
                          partyList: {
                              roles: {
                                  some: {
                                      role: { name: { contains: search } },
                                  },
                              },
                          },
                      },
                  ],
              }
            : {};

        const vote = await prisma.vote.findFirst({
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                refers: {
                    select: {
                        id: true,
                        refer: true,
                    },
                },
                documents: {
                    select: {
                        id: true,
                        document: true,
                    },
                },
                result: {
                    select: {
                        maxAttendees: true,
                        agrees: {
                            select: {
                                id: true,
                                partyList: {
                                    include: {
                                        roles: { include: { role: true } },
                                    },
                                },
                            },
                            where: searchFilter,
                        },
                        disagrees: {
                            select: {
                                id: true,
                                partyList: {
                                    include: {
                                        roles: { include: { role: true } },
                                    },
                                },
                            },
                            where: searchFilter,
                        },
                        abstains: {
                            select: {
                                id: true,
                                partyList: {
                                    include: {
                                        roles: { include: { role: true } },
                                    },
                                },
                            },
                            where: searchFilter,
                        },
                        noVotes: {
                            select: {
                                id: true,
                                partyList: {
                                    include: {
                                        roles: { include: { role: true } },
                                    },
                                },
                            },
                            where: searchFilter,
                        },
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
            where: { id: parseInt(id) },
        });

        const agreeCount = vote.result.agrees.length;
        const disagreeCount = vote.result.disagrees.length;
        const abstainCount = vote.result.abstains.length;
        const noVoteCount = vote.result.noVotes.length;

        const totalPartyListCount =
            agreeCount + disagreeCount + noVoteCount + abstainCount;

        const agreePercentage =
            totalPartyListCount > 0
                ? ((agreeCount / totalPartyListCount) * 100).toFixed(2)
                : "0.00";
        const disagreePercentage =
            totalPartyListCount > 0
                ? ((disagreeCount / totalPartyListCount) * 100).toFixed(2)
                : "0.00";
        const abstainPercentage =
            totalPartyListCount > 0
                ? ((abstainCount / totalPartyListCount) * 100).toFixed(2)
                : "0.00";
        const noVotePercentage =
            totalPartyListCount > 0
                ? ((noVoteCount / totalPartyListCount) * 100).toFixed(2)
                : "0.00";

        let voteResult;
        const effectiveTotal = agreeCount + disagreeCount + noVoteCount;

        if (agreeCount > disagreeCount && agreeCount > noVoteCount) {
            voteResult = {
                type: `Agree`,
                with: agreeCount,
                to: Math.max(disagreeCount, noVoteCount),
                percentage: ((agreeCount / effectiveTotal) * 100).toFixed(2),
            };
        } else if (disagreeCount > agreeCount && disagreeCount > noVoteCount) {
            voteResult = {
                type: `Disagree`,
                with: disagreeCount,
                to: Math.max(agreeCount, noVoteCount),
                percentage: ((disagreeCount / effectiveTotal) * 100).toFixed(2),
            };
        } else if (abstainCount > agreeCount && disagreeCount > noVoteCount) {
            voteResult = {
                type: `Abstain`,
                with: abstainCount,
                to: Math.max(agreeCount, abstainCount),
                percentage: ((noVoteCount / effectiveTotal) * 100).toFixed(2),
            };
        } else {
            voteResult = {
                type: "Tie | no result",
                with: null,
                to: null,
                percentage: null,
            };
        }

        const voteData = {
            ...vote,
            result: {
                ...vote.result,
                total: {
                    maxAttendees: vote.result.maxAttendees.number,
                    agreeCount,
                    disagreeCount,
                    abstainCount,
                    noVoteCount,
                    totalPartyListCount,
                },
                percentages: {
                    agreePercentage,
                    disagreePercentage,
                    abstainPercentage,
                    noVotePercentage,
                },
                summary: voteResult,
            },
        };

        res.status(200).send(voteData);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.AddVote = async (req, res, next) => {
    try {
        const {
            title,
            description,
            content,
            refer_name,
            maxAttendees_number,
            agree_partyLists,
            disagrees_partyLists,
            abstains_partyLists,
            noVotes_partyLists,
        } = req.body;

        const requiredFields = {
            title: "Title",
            description: "Description",
            content: "Content",
            maxAttendees_number: "Max Attendees Number",
            agree_partyLists: "Agree PartyLists",
            disagrees_partyLists: "Disagree PartyLists",
            abstentions_partyLists: "Abstentions PartyLists",
            noVotes_partyLists: "NoVotes PartyLists",
        };

        const errorMessage = validateRequiredFields(req.body, requiredFields);

        if (errorMessage) {
            return res
                .status(400)
                .json({ message: errorMessage, type: "error" });
        }

        const documents = req.files.map((file) => ({
            fileName: file.filename,
            path: `/Uploads/${file.filename}`,
        }));

        await prisma.vote.create({
            data: {
                title,
                description,
                content,
                refers: {
                    create: {
                        refer: { create: { name: refer_name } },
                    },
                },
                documents: {
                    createMany: {
                        data: documents,
                    },
                },
                result: {
                    create: {
                        maxAttendees: {
                            create: { number: maxAttendees_number },
                        },
                        agrees: {
                            create: agree_partyLists.map((partyListId) => ({
                                partyList: { connect: { id: partyListId } },
                            })),
                        },
                        disagrees: {
                            create: disagrees_partyLists.map((partyListId) => ({
                                partyList: { connect: { id: partyListId } },
                            })),
                        },
                        abstains: {
                            create: abstains_partyLists.map((partyListId) => ({
                                partyList: { connect: { id: partyListId } },
                            })),
                        },
                        noVotes: {
                            create: noVotes_partyLists.map((partyListId) => ({
                                partyList: { connect: { id: partyListId } },
                            })),
                        },
                    },
                },
            },
            include: {
                result: true,
            },
        });

        res.status(201).json({
            message: `เพิ่มการลงมติ ${title} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};

exports.RemoveVote = async (req, res, next) => {
    try {
        const { id } = req.body;

        const vote = await prisma.vote.findFirst({
            select: {
                title: true,
                documents: {
                    select: {
                        name: true,
                        path: true,
                    },
                },
            },
            where: {
                id: parseInt(id),
            },
        });

        if (!vote) {
            return res
                .status(404)
                .json({ message: "ไม่พบการลงมติ", type: "error" });
        }

        vote.documents.forEach((document) => {
            fs.unlinkSync(path.join(__dirname, "..", document.path));
        });

        await prisma.vote.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({
            message: `ลบการลงมติ ${vote.title} เรียบร้อยแล้ว`,
            type: "success",
        });
    } catch (e) {
        e.status = 400;
        next(e);
    }
};
