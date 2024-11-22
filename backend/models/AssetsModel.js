const mongoose = require('mongoose');


const AssetSchema = new mongoose.Schema({
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
        default:"assets"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 10,
        trim: true
    },
    rValue: {
        type: Number,
        required: true,
        maxLength: 10,
        trim: true
    },
    years: {
        type: Number,
        required: true,
        maxLength: 2,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Assets', AssetSchema)