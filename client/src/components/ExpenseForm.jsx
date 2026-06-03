import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit, loading }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNote(editingExpense.note || '');
    } else {
      setAmount('');
      setCategory('Food');
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
    }
    setErrors({});
  }, [editingExpense]);

  function validate() {
    const newErrors = {};
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    if (!category) {
      newErrors.category = 'Category is required';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    } else {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (new Date(date) > today) {
        newErrors.date = 'Date cannot be in the future';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await onSubmit({
        amount: parseFloat(amount),
        category,
        date,
        note: note.trim(),
      });
      if (!editingExpense) {
        setAmount('');
        setCategory('Food');
        setDate(new Date().toISOString().split('T')[0]);
        setNote('');
      }
      setErrors({});
    } catch {
      // error handled by hook
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a note..."
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {editingExpense ? 'Update' : 'Add'} Expense
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
