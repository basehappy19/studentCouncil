const mongoose = require("mongoose")

const voteDocument = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
})

const VoteSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    voteTitle: {
        type: String,
        required: true,
    },
    voteDescription: {
        type: String,
        required: true,
    },
    voteContent: {
        type: String,
        required: true,
    },
    voteRefer: {
        type: String,
    },
    voteDate: {
        type: Date,
        required: true,
    },
    voteDocument: {
        type: [voteDocument],
    },
    voteAgree: {
        type: [Number],
        required: true,
    },
    voteDisagree: {
        type: [Number],
        required: true,
    },
    voteAbstention: {
        type: [Number],
        required: true,
    },
    voteAbstain: {
        type: [Number],
        required: true,
    },
    voteMaxAttendees: {
        type: [Number],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Vote', VoteSchema)