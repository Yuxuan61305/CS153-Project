import React, { createContext, useState, useContext } from 'react';

// 1. Create Context
const ExpenseContext = createContext();

// 2. Create Provider Component
export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  // Add new expense
  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  // Clear all expenses
  const clearExpenses = () => {
    setExpenses([]);
  };

  // Optionally: Delete one expense by ID
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, clearExpenses, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// 3. Custom Hook for easier use
export const useExpenses = () => useContext(ExpenseContext);
