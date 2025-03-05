import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseManager from './components/ExpenseManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>
          <ExpenseManager />
      </div>
    </div>
  );
}

export default App;
