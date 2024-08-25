const Role = require('../Models/RoleModel')

exports.AllRole = async(req,res)=>{
    try {
        const All = await Role.find({})
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('Role Error : ' + err);
        res.status(500).send('Role Error')
    }
}

exports.AddRole = async(req,res)=>{
    try {
        let data = req.body
        const Add = await Role(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddRole Error : ' + err);
        res.status(500).send('AddRole Error')
    }
}