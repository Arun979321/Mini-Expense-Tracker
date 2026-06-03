import { useState, useEffect, useCallback, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/expenses`);
      if (!res.ok) throw new Error('Failed to fetch expenses');
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = useCallback(async (expense) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add expense');
      setExpenses((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExpense = useCallback(async (id, expense) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update expense');
      setExpenses((prev) => prev.map((e) => (e.id === id ? data : e)));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete expense');
      }
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    if (filterCategory !== 'All') {
      filtered = filtered.filter((e) => e.category === filterCategory);
    }

    if (dateRange === 'thisMonth') {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter((e) => e.date >= start && e.date <= today);
    } else if (dateRange === 'lastMonth') {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        .toISOString()
        .split('T')[0];
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
        .toISOString()
        .split('T')[0];
      filtered = filtered.filter((e) => e.date >= start && e.date <= end);
    } else if (dateRange === 'custom') {
      if (customStart) {
        filtered = filtered.filter((e) => e.date >= customStart);
      }
      if (customEnd) {
        filtered = filtered.filter((e) => e.date <= customEnd);
      }
    }

    return filtered;
  }, [expenses, filterCategory, dateRange, customStart, customEnd]);

  const summary = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];

    const thisMonthExpenses = expenses.filter(
      (e) => e.date >= monthStart && e.date <= monthEnd
    );
    const totalThisMonth = thisMonthExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
    const totalByCategory = {};
    categories.forEach((cat) => {
      totalByCategory[cat] = expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
    });

    const highestExpense =
      expenses.length > 0
        ? expenses.reduce((max, e) => (e.amount > max.amount ? e : max), expenses[0])
        : null;

    return { totalThisMonth, totalByCategory, highestExpense };
  }, [expenses]);

  return {
    expenses,
    loading,
    error,
    filterCategory,
    setFilterCategory,
    dateRange,
    setDateRange,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    filteredExpenses,
    summary,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    dismissError,
  };
}
