const { addExpense, getExpenses, deleteExpense, getExpense, updateExpense} = require('../controllers/ar_expense');
const { addIncome, getIncomes, deleteIncome, getIncome, updateIncome} = require('../controllers/ar_income');

const router = require('express').Router();



router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .get('/get-income/:id', getIncome)
      .put('/update-income/:id', updateIncome)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpenses)
      .get('/get-expense/:id', getExpense)
      .put('/update-expense/:id', updateExpense)
      .delete('/delete-expense/:id', deleteExpense)
      .post('/export')
module.exports = router