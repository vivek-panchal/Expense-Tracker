const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Other']
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Expense', ExpenseSchema);