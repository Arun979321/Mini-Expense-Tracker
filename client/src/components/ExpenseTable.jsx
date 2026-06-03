import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/dateHelpers';

const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-800',
  Transport: 'bg-blue-100 text-blue-800',
  Bills: 'bg-red-100 text-red-800',
  Entertainment: 'bg-purple-100 text-purple-800',
  Other: 'bg-gray-100 text-gray-800',
};

export default function ExpenseTable({ expenses, onEdit, onDelete, onExportCSV }) {
  if (expenses.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Expenses</h2>
        <button
          onClick={onExportCSV}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(expense.date)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      CATEGORY_COLORS[expense.category]
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium whitespace-nowrap">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">
                  {expense.note || '-'}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onEdit(expense)}
                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors mr-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense)}
                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
