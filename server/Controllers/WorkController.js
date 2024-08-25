const Work = require('../Models/WorkModel')

exports.AllWork = async(req,res)=>{
    try {
        const All = await Work.aggregate([
            {  
                $lookup: {
                    from: "worktags",
                    localField: "workTagId",
                    foreignField: "id",
                    as: "workTagData"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "workOperator",
                    foreignField: "id",
                    as: "workOperatorData"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])
        .exec()
        res.send(All).status(200)
    } catch (err) {
        console.log('AllWork Error : ' + err);
        res.status(500).send('AllWork Error')
    }
}

exports.UserWorks = async (req, res) => {
    try {
        const userId = req.params.userId; 

        const userWorks = await Work.aggregate([
            {
                $match: {
                    $or: [
                        { workOperator: userId },
                        { workPostBy: userId }
                    ]
                }
            },
            {  
                $lookup: {
                    from: "worktags",
                    localField: "workTagId",
                    foreignField: "id",
                    as: "workTagData"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "workOperator",
                    foreignField: "id",
                    as: "workOperatorData"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]).exec();

        res.status(200).json(userWorks);
    } catch (err) {
        console.log('UserWorks Error : ' + err);
        res.status(500).send('UserWorks Error');
    }
}

exports.AddWork = async (req, res) => {
    try {
        var data = req.body;
        console.log(data);
        
        if (!Array.isArray(data.workOperator)) {
            data.workOperator = JSON.parse(data.workOperator);
        }
        
        if (data.workTagId > 0) {
            data.workTagId = parseInt(data.workTagId);
        }

        if (Array.isArray(data.workOperator) && data.workOperator) {
            data.workOperator = data.workOperator.map(operator => parseInt(operator));
        }
        
        if (!Array.isArray(data.workImage) || data.workImage) {
            data.workImage = [];
        }
        
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                data.workImage.push(file.filename);
            });
        }

        const Add = await Work(data).save();
        res.status(200).send(Add);
    } catch (err) {
        console.log('AddWork Error: ' + err);
        res.status(500).send('AddWork Error: ' + err); 
    }
}




