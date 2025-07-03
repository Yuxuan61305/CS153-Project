import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const STORAGE_KEY = '@expenses_data';

  // Load expenses from AsyncStorage on first app load
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error('Failed to load expenses from storage:', error);
      }
    };

    loadExpenses();
  }, []);

  // Save expenses to AsyncStorage whenever expenses change
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Failed to save expenses:', error);
      }
    };

    saveExpenses();
  }, [expenses]);

  // Helper: Sort by latest date first
  const sortByDateDesc = (expensesArray) => {
    return [...expensesArray].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const addExpense = (newExpense) => {
    setExpenses((prev) => sortByDateDesc([...prev, newExpense]));
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, clearExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
