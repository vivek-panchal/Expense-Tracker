import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-400">No expenses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr 
                  key={expense._id} 
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 text-green-400">₹{expense.amount.toFixed(2)}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">{formatDate(expense.date)}</td>
                  <td className="p-3">{expense.description || '-'}</td>
                  <td className="p-3 space-x-2">
                    <button 
                      onClick={() => onEdit(expense)}
                      className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(expense._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;