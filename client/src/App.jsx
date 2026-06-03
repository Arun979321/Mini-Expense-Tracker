import { useState, useCallback } from 'react';
import { useExpenses } from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SummaryPanel from './components/SummaryPanel';
import CategoryChart from './components/CategoryChart';
import FilterBar from './components/FilterBar';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';

export default function App() {
  const {
    loading,
    error,
    filteredExpenses,
    summary,
    filterCategory,
    setFilterCategory,
    dateRange,
    setDateRange,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    addExpense,
    updateExpense,
    deleteExpense,
    dismissError,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  const handleAdd = useCallback(async (expense) => {
    await addExpense(expense);
  }, [addExpense]);

  const handleUpdate = useCallback(async (expense) => {
    await updateExpense(editingExpense.id, expense);
    setEditingExpense(null);
  }, [updateExpense, editingExpense]);

  const handleDelete = useCallback(async () => {
    if (!deletingExpense) return;
    await deleteExpense(deletingExpense.id);
    setDeletingExpense(null);
  }, [deleteExpense, deletingExpense]);

  const handleEdit = useCallback((expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExportCSV = useCallback(() => {
    const headers = ['Date', 'Category', 'Amount', 'Note'];
    const rows = filteredExpenses.map((e) => [
      e.date,
      e.category,
      e.amount.toString(),
      `"${(e.note || '').replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filteredExpenses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your daily expenses</p>
        </header>

        {error && (
          <div className="mb-6 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button onClick={dismissError} className="text-red-500 hover:text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {loading && (
          <div className="fixed top-4 right-4 z-50">
            <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        <SummaryPanel summary={summary} />

        <div className="mt-6">
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdate : handleAdd}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
            loading={loading}
          />
        </div>

        <div className="mt-6">
          <FilterBar
            filterCategory={filterCategory}
            onCategoryChange={setFilterCategory}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            customStart={customStart}
            onCustomStartChange={setCustomStart}
            customEnd={customEnd}
            onCustomEndChange={setCustomEnd}
          />
        </div>

        <div className="mt-6">
          {filteredExpenses.length === 0 ? (
            <EmptyState
              hasExpenses={summary.highestExpense !== null}
              filteredCount={filteredExpenses.length}
            />
          ) : (
            <>
              <ExpenseTable
                expenses={filteredExpenses}
                onEdit={handleEdit}
                onDelete={setDeletingExpense}
                onExportCSV={handleExportCSV}
              />
              <div className="mt-6">
                <CategoryChart totalByCategory={summary.totalByCategory} />
              </div>
            </>
          )}
        </div>

        <DeleteConfirmModal
          expense={deletingExpense}
          onConfirm={handleDelete}
          onCancel={() => setDeletingExpense(null)}
          loading={loading}
        />
      </div>
    </div>
  );
}
