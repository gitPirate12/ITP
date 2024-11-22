const AssetSchema= require("../models/AssetsModel")


exports.addAssets = async (req, res) => {
    const {itemCode, name, date, amount, rValue, years}  = req.body

    const assets = AssetSchema({
        itemCode,
        name,
        date,
        amount,
        rValue,
        years
    })

    try {
        //validations
        if(!itemCode || !name || !date || !rValue || !years ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await assets.save()
        res.status(200).json({message: 'Assets Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(assets)
}

exports.getAssets = async (req, res) =>{
    try {
        const assets = await AssetSchema.find().sort({createdAt: -1})
        res.status(200).json(assets)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//update Asset
exports.updateAsset = async (req, res) => {
    try {
        const {id} = req.params;
        const asset = await AssetSchema.findByIdAndUpdate(id, req.body);
        //if Asset cannot be found
        if(!asset){
            return res.status(404).json({message: `Asset cannot be found`})
        }
        const updatedAsset = await AssetSchema.findById(id);
        res.status(200).json(updatedAsset);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


exports.deleteAssets = async (req, res) =>{
    const {id} = req.params;
    AssetSchema.findByIdAndDelete(id)
        .then((assets) =>{
            res.status(200).json({message: 'Assets Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}