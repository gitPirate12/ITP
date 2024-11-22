const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 30
        },
        category: {
            type: String,
            required: true,
            trim: true,
            maxLength: 30
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            trim: true,
            min: 0,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,   
        },
        date: {
            type: Date,
            required: true,
            trim: true
        }
        

},{timestamps: true})

module.exports = mongoose.model('Item', ItemSchema)