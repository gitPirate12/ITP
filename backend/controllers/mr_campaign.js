const CampaignSchema = require("../models/mr_campaignModel")
const mongoose = require('mongoose')
const Campaigns = require('../models/mr_campaignModel'); 


exports.addCampaign = async (req, res) => {
    //destructuring request body into components
    const {CampaignID, ItemCode, ItemName, MediaType,TargetAudience, StartDate,EndDate,Price,Discount,Qantity,Note,Status} = req.body

    //storing all of these values from the request body into the variable
    const Campaign = CampaignSchema({
        CampaignID,
        ItemCode,
        ItemName,
        MediaType,
        TargetAudience,
        StartDate,
        EndDate,
        Price,
        Discount,
        Qantity,
        Note,
        Status
    })

    //validations 
    try {
        if(!CampaignID|| !ItemCode|| ! ItemName|| ! MediaType|| !TargetAudience|| ! StartDate|| !EndDate|| !Price|| !Discount|| !Qantity|| !Note|| !Status){
            return res.status(400).json({message: 'All fields are required!'})
        }
        //saving into the database
        await Campaign.save()
        res.status(200).json({message: 'Campaign was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getCampaign = async (req, res) => {
    try {
        //finding all Campaign
        const Campaign = await CampaignSchema.find().sort({createdAt: -1})
        res.status(200).json(Campaign)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}



//update database

// exports.updateCampaign = async (req, res) => {
//     //storing object id from the req parameters
//     const {id} = req.params;

//     if(!mongoose.Types.ObjectId.isValid(CampaignID)){
//         return res.status(404).json({error: 'no such Campaign'})
//     }
    
//     const Campaign = await CampaignSchema.findOneAndUpdate({CampaignID: CampaignIDEdi},{
//         ...req.body
//     })

//     if(!Campaign){
//         return res.status(400).json({error: 'No such Campaign'})
//     }

//     res.status(200).json(Campaign)
    
// }

//Update items in the cart
exports.updateCampaign = async (req, res) => {
    const {

        CampaignID,
        ItemCode,
        ItemName,
        MediaType,
        TargetAudience,
        StartDate,
        EndDate,
        Price,
        Discount,
        Note,
        Qantity,
        Status,
        CampaignIDEdit

    } = req.body;

    const appointment = {
        CampaignID,
        ItemCode,
        ItemName,
        MediaType,
        TargetAudience,
        StartDate,
        EndDate,
        Price,
        Discount,
        Note,
        Qantity,
        Status
    }

    const update = await Campaigns.findOneAndUpdate({ CampaignID: CampaignIDEdit }, appointment).then(() => {
        res.status(200).send({ status: "Appointment Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });

}

exports.deleteCampaig = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such Campaign'})
    }
    
    const Campaign = await CampaignSchema.findByIdAndDelete(id)

    if(!Campaign){
        return res.status(400).json({error: 'No such Campaign'})
    }

    res.status(200).json(Campaign)
    
}

// module.exports = {
   
//     editCart,
   
// };
