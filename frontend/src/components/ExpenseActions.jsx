import React from 'react';

const ExpenseActions = ({ total, onClear }) => {
  return (
    <div className=" mb-2 flex justify-between items-center">
      <div className="text-xl font-bold text-green-400">
        {total > 0 && `Total Expenses: ₹${total.toFixed(2)}`}
      </div>
      <button
        onClick={onClear}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ExpenseActions;
