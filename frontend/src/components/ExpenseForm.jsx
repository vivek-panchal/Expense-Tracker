import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded, editingExpense, onUpdateExpense, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Other'];
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: new Date(editingExpense.date).toISOString().split('T')[0],
        description: editingExpense.description || ''
      });
    } else {
      // Reset form with default values when not editing
      setFormData({
        amount: '',
        category: 'Food',  // Set default category as "Food"
        date: '',
        description: ''
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (editingExpense) {
        const response = await axios.put(`${BASE_URL}/api/expenses/${editingExpense._id}`, expenseData);
        onUpdateExpense(response.data);
      } else {
        const response = await axios.post(`${BASE_URL}/api/expenses`, expenseData);
        onExpenseAdded(response.data);
      }

      setFormData({
        amount: '',
        category: 'Food',
        date: '',
        description: ''
      });

    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense');
    }
  };

  const handleCancel = () => {
    setFormData({
      amount: '',
      category: 'Food',
      date: '',
      description: ''
    });
    onCancelEdit(); // Reset editing mode
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter description"
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" onClick={handleCancel} className="flex-1 bg-gray-600 text-white py-2 rounded-md">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
