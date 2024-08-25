const PolicyStatus = require('../Models/PolicyStatusModel')
const Policy = require('../Models/PolicyModel')

exports.AllStatus = async(req,res)=>{
    try {
        const All = await PolicyStatus.find({})
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('PolicyStatus Error : ' + err);
        res.status(500).send('PolicyStatus Error')
    }
}

exports.AllPolicyProgress = async(req,res)=>{
    try {
        const counts = await Policy.aggregate([
            {
                $group: {
                    _id: "$statusId",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const result = {};
        result["AllPolicy"] = 0;
        counts.forEach(item => {
            result["statusId_"+item._id] = item.count;
            result["AllPolicy"] += item.count
        });

        res.status(200).json(result);
    } catch (err) {
        console.log('AllPolicyProgress Error : ' + err);
        res.status(500).send('AllPolicyProgress Error')
    }
}

exports.AddStatus = async(req,res)=>{
    try {
        let data = req.body
        const Add = await PolicyStatus(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddPolicyStatus Error : ' + err);
        res.status(500).send('AddPolicyStatus Error')
    }
}

