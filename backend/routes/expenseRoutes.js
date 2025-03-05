const express = require('express');
const ExpenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/expenses', ExpenseController.createExpense);
router.get('/expenses', ExpenseController.getAllExpenses);
router.put('/expenses/:id', ExpenseController.updateExpense);
router.delete('/expenses/:id', ExpenseController.deleteExpense);
router.get('/expenses/total', ExpenseController.getTotalExpenses);

module.exports = router;