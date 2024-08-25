const Transaction = require('../Models/TransactionModels')


exports.Transaction = async (req, res) => {
    const budgetId = parseInt(req.params.budgetId);

    try {
        const All = await Transaction.aggregate([
            {
                $match: {
                    budgetId: budgetId
                }
            },
            {
                $lookup: {
                    from: "budgets", 
                    localField: "budgetId", 
                    foreignField: "id", 
                    as: "budgetDetails"
                }
            },
            {
                $unwind: "$budgetDetails" 
            },
            {
                $project: {  
                    transactionTitle: "$transactionTitle", 
                    transactionDescription: "$transactionDescription", 
                    transactionAmount: "$transactionAmount", 
                    transactionType: "$transactionType", 
                    createdAt: "$createdAt", 
                    updatedAt: "$updatedAt", 
                    budgetTitle: "$budgetDetails.budgetTitle", 
                }
            }
        ]).exec();

        res.status(200).send(All); 
    } catch (err) {
        console.error('Transaction Error:', err);
        res.status(500).send('Transaction Error');
    }
};

exports.AddTransaction = async (req, res) => {
    try {
        const data = req.body
        const Add = await Transaction(data).save();
        res.status(201).send(Add); 
    } catch (err) {
        console.error('AddTransaction Error:', err);  
        res.status(500).send('AddTransaction Error');
    }
};

exports.UpdateTransaction = async (req, res) => {
    const { id } = req.params; 
    const updateData = req.body; 

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } 
        );

        if (!updatedTransaction) {
            return res.status(404).send('Transaction not found');
        }

        res.status(200).send(updatedTransaction);
    } catch (err) {
        console.error('UpdateTransaction Error:', err);
        res.status(500).send('UpdateTransaction Error');
    }
};

exports.RemoveTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Transaction.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Transaction not found');
        }
        res.status(200).json({message:'Transaction deleted'});
    } catch (err) {
        console.error('Delete Transaction Error:', err);
        res.status(500).send('Internal Server Error');
    }
};


