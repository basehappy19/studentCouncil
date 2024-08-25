const WorkTag = require('../Models/WorkTagModel')

exports.AllWorkTag = async(req,res)=>{
    try {
        const All = await WorkTag.find({})
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('AllWorkTag Error : ' + err);
        res.status(500).send('AllWorkTag Error')
    }
}

exports.AddWorkTag = async(req,res)=>{
    try {
        let data = req.body
        const Add = await WorkTag(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddWorkTag Error : ' + err);
        res.status(500).send('AddWorkTag Error')
    }
}