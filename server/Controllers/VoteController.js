const Vote = require('../Models/VoteModel')

exports.AllVote = async (req, res) => {
    try {
        const All = await Vote.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "voteAgree",
                    foreignField: "id",
                    as: "voteAgree",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],

                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteDisagree",
                    foreignField: "id",
                    as: "voteDisagree",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteAbstention",
                    foreignField: "id",
                    as: "voteAbstention",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteAbstain",
                    foreignField: "id",
                    as: "voteAbstain",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $project: {
                    id: 1,
                    voteTitle: 1,
                    voteDescription: 1,
                    voteContent: 1,
                    voteRefer: 1,
                    voteDate: 1,
                    voteDocument: 1,
                    voteMaxAttendees: 1,
                    voteAgree: {
                        $map: {
                            input: "$voteAgree",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteDisagree: {
                        $map: {
                            input: "$voteDisagree",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteAbstention: {
                        $map: {
                            input: "$voteAbstention",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteAbstain: {
                        $map: {
                            input: "$voteAbstain",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                }
            },
            
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]).exec();
        res.send(All).status(200);
    } catch (err) {
        console.log('AllVote Error : ' + err);
        res.status(500).send('AllVote Error');
    }
};


exports.Vote = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const vote = await Vote.aggregate([
            {
                $match: {
                    id: id
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteAgree",
                    foreignField: "id",
                    as: "voteAgree",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],

                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteDisagree",
                    foreignField: "id",
                    as: "voteDisagree",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteAbstention",
                    foreignField: "id",
                    as: "voteAbstention",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "voteAbstain",
                    foreignField: "id",
                    as: "voteAbstain",
                    pipeline: [
                        {
                            $lookup: {
                                from: "roles",
                                localField: "roleId",
                                foreignField: "roleId",
                                as: "rolesData"
                            }
                        }
                    ],
                }
            },
            {
                $project: {
                    id: 1,
                    voteTitle: 1,
                    voteDescription: 1,
                    voteContent: 1,
                    voteRefer: 1,
                    voteDate: 1,
                    voteDocument: 1,
                    voteMaxAttendees: 1,
                    voteAgree: {
                        $map: {
                            input: "$voteAgree",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteDisagree: {
                        $map: {
                            input: "$voteDisagree",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteAbstention: {
                        $map: {
                            input: "$voteAbstention",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                    voteAbstain: {
                        $map: {
                            input: "$voteAbstain",
                            as: "user",
                            in: {
                                id: "$$user.id",
                                roleId: "$$user.roleId",
                                displayName: "$$user.displayName",
                                profilePicture: "$$user.profilePicture",
                                rolesData: "$$user.rolesData"
                            }
                        }
                    },
                }
            },
            
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]).exec();
        res.send(vote).status(200);
    } catch (err) {
        console.log('Vote Error : ' + err);
        res.status(500).send('Vote Error');
    }
};



exports.AddVote = async(req,res)=>{
    try {
        let data = req.body
        const Add = await Vote(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddVote Error : ' + err);
        res.status(500).send('AddVote Error')
    }
}