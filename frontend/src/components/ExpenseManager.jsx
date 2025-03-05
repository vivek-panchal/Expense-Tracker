import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList';
import Filters from './Filters';
import ExpenseActions from './ExpenseActions';
import ExpenseForm from './ExpenseForm';

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '', startDate: '', endDate: '' });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editingExpense, setEditingExpense] = useState(null);

  const BASE_URL= import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      fetchTotalExpenses();
    }
  }, [filters.startDate, filters.endDate]);

  const fetchExpenses = async () => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await axios.get(`${BASE_URL}/api/expenses?${queryParams}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.get('${BASE_URL}/api/expenses/total', {
        params: { startDate: filters.startDate, endDate: filters.endDate }
      });
      setTotalExpenses(response.data.total);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  const handleExpenseDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  const handleExpenseEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense._id === updatedExpense._id ? updatedExpense : expense
    ));
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg">
        <ExpenseForm editingExpense={editingExpense} onUpdateExpense={handleUpdateExpense} />
      </div>
      <div className="md:w-2/3 flex flex-col gap-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <Filters filters={filters} onFilterChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })} />
        </div>
        <div className=" rounded-lg ">
          <ExpenseActions total={totalExpenses} onClear={() => setFilters({ category: '', date: '', startDate: '', endDate: '' })} />
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <ExpenseList expenses={expenses} onEdit={handleExpenseEdit} onDelete={handleExpenseDelete} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
