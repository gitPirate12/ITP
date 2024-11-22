const ExpenseSchema = require("../models/ar_expenseModel")


exports.addExpense = async (req, res) => {
    //destructuring request body into its components
    const {title, amount, category, description, type, date} = req.body

    //storing all of these values from the request body into the income variable
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        type,
        date
    })

    //validations 
    try {
        if(!title || !category || !description || !type || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Valid amount requried'})
        }
        //saving data into the database
        await expense.save()
        res.status(200).json({message: 'Expense was added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    
}

exports.getExpenses = async (req, res) => {
    try {
        //finding all incomes, showing the last income entered first
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }

}

exports.getExpense = async(req, res) => {
    try {
        //finding a single expense
        const {id} = req.params;
        const expense = await ExpenseSchema.findById(id);
        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.updateExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const expense = await ExpenseSchema.findByIdAndUpdate(id, req.body);
        //if expense cannot be found
        if(!expense){
            return res.status(404).json({message: `Expense with ID ${id} cannot be found`})
        }
        const updatedExpense = await ExpenseSchema.findById(id);
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.deleteExpense = async (req, res) => {
    //storing object id from the req parameters
    const {id} = req.params;
    
    //finding and deleting said item from database
    ExpenseSchema.findByIdAndDelete(id).then((expense) => {
        res.status(200).json({message: 'Expense has been deleted'})
    })
    .catch((err) => {
        res.status(500).json({message: 'Server Error'})
    })

}

exports.writecsv = async(req, res) => {
    
}
