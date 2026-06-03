import { formatCurrency } from '../utils/formatCurrency';

const CATEGORY_COLORS = {
  Food: 'text-green-600',
  Transport: 'text-blue-600',
  Bills: 'text-red-600',
  Entertainment: 'text-purple-600',
  Other: 'text-gray-600',
};

export default function SummaryPanel({ summary }) {
  const { totalThisMonth, totalByCategory, highestExpense } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
        <p className="text-sm font-medium text-gray-500">Total This Month</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalThisMonth)}</p>
        <p className="text-xs text-gray-400 mt-1">Current month expenses</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
        <p className="text-sm font-medium text-gray-500">Category Breakdown</p>
        <div className="mt-2 space-y-1">
          {Object.entries(totalByCategory).map(([cat, amount]) => (
            <div key={cat} className="flex items-center justify-between text-sm">
              <span className={`font-medium ${CATEGORY_COLORS[cat] || 'text-gray-600'}`}>{cat}</span>
              <span className="text-gray-700">{formatCurrency(amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
        <p className="text-sm font-medium text-gray-500">Highest Expense</p>
        {highestExpense ? (
          <div className="mt-1">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(highestExpense.amount)}</p>
            <p className="text-sm text-gray-600 mt-1">
              {highestExpense.note || 'No note'} &middot; {highestExpense.category}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{highestExpense.date}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-2">No expenses yet</p>
        )}
      </div>
    </div>
  );
}
