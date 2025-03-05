const Expense = require('../models/Expense');

class ExpenseController {
  async createExpense(req, res) {
    try {
      const { amount, category, date, description } = req.body;
      const newExpense = new Expense({ 
        amount, 
        category, 
        date, 
        description 
      });
      
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllExpenses(req, res) {
    try {
      const { category, date } = req.query;
      let query = {};

      if (category) {
        query.category = category;
      }

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        query.date = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      }

      if (req.query.startDate && req.query.endDate) {
        query.date = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        };
      }

      const expenses = await Expense.find(query).sort({ date: -1 });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedExpense = await Expense.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );

      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.json(updatedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const { id } = req.params;
      const deletedExpense = await Expense.findByIdAndDelete(id);

      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTotalExpenses(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      const totalExpenses = await Expense.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]);

      res.json({ 
        total: totalExpenses[0] ? totalExpenses[0].total : 0 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ExpenseController();