import React, { useState } from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const [useDateRange, setUseDateRange] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={onFilterChange}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={() => setUseDateRange(!useDateRange)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          {useDateRange ? 'Use Filter Date' : 'Use Date Range'}
        </button>

        {useDateRange ? (
          <>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={onFilterChange}
              className="bg-gray-700 text-white p-2 rounded"
              placeholder="Start Date"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={onFilterChange}
              className="bg-gray-700 text-white p-2 rounded"
              placeholder="End Date"
            />
          </>
        ) : (
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={onFilterChange}
            className="bg-gray-700 text-white p-2 rounded"
            placeholder="Select Date"
          />
        )}
      </div>
    </div>
  );
};

export default Filters;
