const User = require('../Models/UserModel')

exports.AllUser = async (req, res) => {
    try {
        const All = await User.aggregate([
            {
                $lookup: {
                    from: 'roles', 
                    localField: 'roleId',
                    foreignField: 'id',
                    as: 'roleData'
                }
            },
            {
                $lookup: {
                    from: 'accesses', 
                    localField: 'accessId',
                    foreignField: 'id',
                    as: 'accessData'
                }
            },
            {
                $project: {
                    password: 0 
                }
            }
        ]);

        res.status(200).send(All);
    } catch (err) {
        console.log('AllUser Error : ' + err);
        res.status(500).send('AllUser Error');
    }
}



exports.AddUser = async(req,res)=>{
    try {
        let data = req.body
        const Add = await User(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddUser Error : ' + err);
        res.status(500).send('AddUser Error')
    }
}