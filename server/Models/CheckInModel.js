const mongoose = require("mongoose");

const CheckInSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true, 
    },
    userId: {
        type: String,
        required: true, 
    },
    attendTime: {
        type: Date, 
        required: true, 
        default: Date.now 
    },
    type: {
        type: Number, 
        required: true, 
        default: 1
    },
    motive: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('CheckIn', CheckInSchema);
