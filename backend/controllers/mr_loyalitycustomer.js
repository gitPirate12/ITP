const loyalitySchema = require("../models/mr_loyalityModule")
const mongoose = require('mongoose')


exports.addsloyality = async (req, res) => {
    //destructuring request body into components
    const {CID, CustomerName, phone, paymentDetails,points,Status} = req.body

    //storing all of these values from the request body into the variable
    const loyality = loyalitySchema({
        CID,
        CustomerName,
        phone,
        paymentDetails,
        points,
        Status
    })

    //validations 
    try {
        if(!CID || !CustomerName || !phone || !paymentDetails || !points || ! Status){
            return res.status(400).json({message: 'All fields are required!'})
        }
        //saving into the database
        await loyality.save()
        res.status(200).json({message: 'loyalitycustomer was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getloyality = async (req, res) => {
    try {
        //finding all loyalitys
        const loyality= await loyalitySchema.find().sort({createdAt: -1})
        res.status(200).json(loyality)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}



//update database

exports.updateloyality = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such loyality'})
    }
    
    const loyality = await loyalitySchema.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!loyality){
        return res.status(400).json({error: 'No such loyality'})
    }

    res.status(200).json(loyality)
    
}

exports.deleteloyality = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such loyality'})
    }
    
    const loyality = await loyalitySchema.findByIdAndDelete(id)

    if(!loyality){
        return res.status(400).json({error: 'No such loyality'})
    }

    res.status(200).json(loyality)
    
}
