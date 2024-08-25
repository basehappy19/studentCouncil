const Skill = require('../Models/SkillModel')

exports.AllSkill = async(req,res)=>{
    try {
        const All = await Skill.find({})
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('Skill Error : ' + err);
        res.status(500).send('Skill Error')
    }
}

exports.AddSkill = async(req,res)=>{
    try {
        let data = req.body
        const Add = await Skill(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddSkill Error : ' + err);
        res.status(500).send('AddSkill Error')
    }
}