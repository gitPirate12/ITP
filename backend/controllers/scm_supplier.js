const supplierSchema = require("../models/scm_supplierModule")
const mongoose = require('mongoose')


exports.addsupplier = async (req, res) => {
    //destructuring request body into components
    const {SID, supplierName, phone, itemType, paymentDetails} = req.body

    //storing all of these values from the request body into the variable
    const supplier = supplierSchema({
        SID,
        supplierName,
        phone,
        itemType,
        paymentDetails
    })

    //validations 
    try {
        if(!SID || !supplierName || !phone || !itemType || !paymentDetails){
            return res.status(400).json({message: 'All fields are required!'})
        }
        //saving into the database
        await supplier.save()
        res.status(200).json({message: 'supplier was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getsuppliers = async (req, res) => {
    try {
        //finding all suppliers
        const suppliers = await supplierSchema.find().sort({createdAt: -1})
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}



//update database

exports.updateSupplier = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such supplier'})
    }
    
    const Supplier = await supplierSchema.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!Supplier){
        return res.status(400).json({error: 'No such supplier'})
    }

    res.status(200).json(Supplier)
    
}

exports.deletesupplier = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such supplier'})
    }
    
    const supplier = await supplierSchema.findByIdAndDelete(id)

    if(!supplier){
        return res.status(400).json({error: 'No such supplier'})
    }

    res.status(200).json(supplier)
    
}
