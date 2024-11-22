const LiabilitySchema = require("../models/LiabilitiesModel")

//Add Liability
exports.addLiability = async (req, res) => {
    const {itemCode, name, date, amount, ratio, years}  = req.body

    const assets = LiabilitySchema({
        itemCode,
        name,
        date,
        amount,
        ratio,
        years
    })

    try {
        //validations
        if(!itemCode || !name || !date || !ratio || !years ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await assets.save()
        res.status(200).json({message: 'Liability Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(assets)
}

//Get Liability
exports.getLiabilities = async (req, res) =>{
    try {
        const liabilities = await LiabilitySchema.find().sort({createdAt: -1})
        res.status(200).json(liabilities)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//update Liability
exports.updateLiability = async (req, res) => {
    try {
        const {id} = req.params;
        const liability = await LiabilitySchema.findByIdAndUpdate(id, req.body);
        //if Liability cannot be found
        if(!liability){
            return res.status(404).json({message: `Liability with ID ${id} cannot be found`})
        }
        const updatedLiability = await LiabilitySchema.findById(id);
        res.status(200).json(updatedLiability);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Delete Liability
exports.deleteLiability = async (req, res) =>{
    const {id} = req.params;
    LiabilitySchema.findByIdAndDelete(id) 
        .then((liability) =>{
            res.status(200).json({message: 'Liability Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}