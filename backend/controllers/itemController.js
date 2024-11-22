
const mongoose = require('mongoose')


const ItemSchema = require("../models/itemModel")


exports.addItem = async (req, res) => {
    //destructuring request body into its components
    const {name, category, price, quantity, description, date} = req.body

    //storing all of these values from the request body into the item variable
    const item = ItemSchema({
        name,
        category,
        price,
        quantity,
        description,
        date
    })

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }

    if(!category){
        emptyFields.push('category')
    }

    if(!price){
        emptyFields.push('price')
    }

    if(!quantity){
        emptyFields.push('quantity')
    }

    if(!description){
        emptyFields.push('description')
    }

    if(!date){
        emptyFields.push('date')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    


    //validations 
    try {
        if(!name || !category || !price || !quantity|| !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        
        if(price <= 0 ){
            return res.status(400).json({message: 'Valid price required'})
        }
        //saving data into the database
        await item.save()
        res.status(200).json({message: 'Item was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getItems = async (req, res) => {
    try {
        //finding all items, showing the last items entered first
        const items = await ItemSchema.find().sort({createdAt: -1})
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

exports.deleteItem = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such item'})
    }
    
    const item = await ItemSchema.findByIdAndDelete({_id:id})

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
    
}

exports.getItem = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;
    //finding and deleting said item from database
    const item= await ItemSchema.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such item'})
    }

    if(!item){
        return res.status(404).json({error: 'No such item'})
    }

    res.status(200).json(item)
}

exports.updateItem = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such item'})
    }
    
    const item = await ItemSchema.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
    
}