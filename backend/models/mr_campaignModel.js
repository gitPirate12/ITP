const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    CampaignID: {
        type:String,
        required:true
    },

    ItemCode: {
        type:String,
        required:true
    },

    ItemName: {
        type:String,
        required:true
    },

    MediaType: {
        type:String,
        required:true
    },

    TargetAudience: {
        type:String,
        required:true
    },

    StartDate: {
        type:String,
        required:true
    },

    EndDate: {
        type:String,
        required:true
    },

    Price: {
        type:String,
        required:true
    },

    Discount: {
        type:String,
        required:true
    },

    Qantity: {
        type:String,
        required:true
    },

    Note: {
        type:String,
        required:true
    },

    Status: {
        type:String,
        required:true
    }

});

const Campaigns = mongoose.model('Campaign',CampaignSchema);

module.exports = Campaigns;