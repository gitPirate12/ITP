const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
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
        phone: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        itemType: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        paymentDetails: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },

},
{timestamps: true}
)
module.exports = mongoose.model('Supplier', SupplierSchema)