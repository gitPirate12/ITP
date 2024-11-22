const mongoose = require('mongoose');

const SupplyOrderSchema = new mongoose.Schema({
        orderID: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        SID: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        supplierName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        item: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
            maxLength: 50,
        },
        price: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        discount: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        deliverydate: {
            type: Date,
            required: true,
            trim: true
        }
        

},
{timestamps: true}
)
module.exports = mongoose.model('SupplyOrder', SupplyOrderSchema)