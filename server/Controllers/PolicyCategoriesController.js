const PolicyCategories = require('../Models/PolicyCategoriesModel')

exports.AllPolicyCategories = async(req,res)=>{
    try {
        const All = await PolicyCategories.find({})
        .sort({id: 1})
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('AllPolicyCategories Error : ' + err);
        res.status(500).send('AllPolicyCategories Error')
    }
}

exports.PolicyCategories = async(req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const data = await PolicyCategories.aggregate([
            {
                $match: {
                    id: id
                }
            }
        ])
        .sort({id: 1})
        .exec()
        res.send(data[0]).status(200)
    } catch (err) {
        console.log('PolicyCategories Error : ' + err);
        res.status(500).send('PolicyCategories Error')
    }
}

exports.AddPolicyCategory = async(req,res)=>{
    try {
        let data = req.body
        const Add = await PolicyCategories(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddPolicyCategory Error : ' + err);
        res.status(500).send('AddPolicyCategory Error')
    }
}
