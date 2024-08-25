const Counter = require('../Models/CounterModel')

const getNextSequence = async (sequenceName) => {
    const counter = await Counter.findByIdAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
};

module.exports = {
    getNextSequence
};
