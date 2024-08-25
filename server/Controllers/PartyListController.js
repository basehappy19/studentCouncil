const PartyList = require('../Models/PartyListModel')
exports.AllPartyList = async(req,res)=>{
    try {
        const All = await PartyList.aggregate([
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "id",
                    as: "roleData"
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skillId",
                    foreignField: "id",
                    as: "skillData"
                }
            }
        ])
        .exec();
        res.send(All).status(200)
    } catch (err) {
        console.log('AllPartyList Error : ' + err);
        res.status(500).send('AllPartyList Error')
    }
}

exports.PartyList = async(req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const data = await PartyList.aggregate([
            {
                $match: {
                    id: id,
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "id",
                    as: "roleData"
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skillId",
                    foreignField: "id",
                    as: "skillData"
                }
            }
        ])
        .exec();
        res.send(data).status(200)
    } catch (err) {
        console.log('PartyList Error : ' + err);
        res.status(500).send('PartyList Error')
    }
}

exports.HomePagePartyList = async (req, res) => {
    try {
        const data = await PartyList.aggregate([
            {
                $match: {
                    showInHomepage: true
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "id",
                    as: "roleData"
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "skillId",
                    foreignField: "id",
                    as: "skillData"
                }
            },
            {
                $sort: { orderHomepage: 1 } 
            }
        ]);

        res.status(200).send(data);
    } catch (err) {
        console.log('HomePagePartyList Error : ' + err);
        res.status(500).send('HomePagePartyList Error');
    }
}


exports.AddPartyList = async(req,res)=>{
    try {
        let data = req.body
        const Add = await PartyList(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddPartyList Error : ' + err);
        res.status(500).send('AddPartyList Error')
    }
}