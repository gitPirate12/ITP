const mongoose = require('mongoose');


const LiabilitySchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    type: {
        type: String,
        default:"liabilities"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    ratio: {
        type: Number,
        required: true,
        maxLength: 2,
        trim: true
    },
    years: {
        type: Number,
        required: true,
        maxLength: 2,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Liability', LiabilitySchema)