const mongoose = require('mongoose');

const loyalitySchema = new mongoose.Schema({
        CID: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        CustomerName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        paymentDetails: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,                                    

        },
        points: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        Status: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },

},
{timestamps: true}
)
module.exports = mongoose.model('loyality', loyalitySchema)