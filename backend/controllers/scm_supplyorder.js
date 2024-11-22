const supplyOrderSchema = require("../models/scm_supplyOrderModule")
const mongoose = require('mongoose')

exports.addsupplyOrder = async (req, res) => {
    //destructuring request body into components
    const {orderID, SID, supplierName, item, amount,price,discount,deliverydate} = req.body

    //storing all of these values from the request body into the variable
    const supplyOrder = supplyOrderSchema({
        orderID,
        SID,
        supplierName,
        item,
        amount,
        price,
        discount,
        deliverydate
    })

    //validations 
    try {
        if(!orderID || !SID || !supplierName || !item || !amount || !price || !discount || !deliverydate ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        //saving into the database
        await supplyOrder.save()
        res.status(200).json({message: 'supplyOrder was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getsupplyOrders = async (req, res) => {
    try {
        //finding all supplyOrders
        const supplyOrders = await supplyOrderSchema.find().sort({createdAt: -1})
        res.status(200).json(supplyOrders)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}



exports.updatesupplyorder = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such order'})
    }
    
    const supplyorder = await supplyOrderSchema.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!supplyorder){
        return res.status(400).json({error: 'No such order'})
    }

    res.status(200).json(supplyorder)
    
}

exports.deletesupplyorder = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such order'})
    }
    
    const supplyorder = await supplyOrderSchema.findByIdAndDelete(id)

    if(!supplyorder){
        return res.status(400).json({error: 'No such order'})
    }

    res.status(200).json(supplyorder)
    
}
