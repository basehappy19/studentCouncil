const Budget = require('../Models/BudgetModel')

exports.AllBudget = async (req, res) => {
    try {
        const All = await Budget.find({})
            .sort({ budgetAmount: -1 })  
            .exec();
        res.status(200).send(All); 
    } catch (err) {
        console.error('AllBudget Error:', err);  
        res.status(500).send('AllBudget Error');
    }
};

exports.Budget = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const All = await Budget.aggregate([{
            $match: {
                id: id
            }
        }])
        .exec();
        res.status(200).send(All); 
    } catch (err) {
        console.error('AllBudget Error:', err);  
        res.status(500).send('AllBudget Error');
    }
};


exports.AddBudget = async (req,res) => {
    try {
        let data = req.body
        const Add = await Budget(data).save()
        res.send(Add).status(200)
    } catch (err) {
        console.log('AddBudget Error :',err);
        res.status(500).send('AddBudget Error')
    }
}