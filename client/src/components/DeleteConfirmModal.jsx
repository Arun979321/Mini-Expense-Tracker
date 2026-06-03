export default function DeleteConfirmModal({ expense, onConfirm, onCancel, loading }) {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900">Delete Expense</h3>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this expense? This action cannot be undone.
        </p>
        {expense && (
          <div className="mt-3 bg-gray-50 rounded-md p-3 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> ₹{expense.amount.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Category:</span> {expense.category}
            </p>
            {expense.note && (
              <p className="text-gray-700">
                <span className="font-medium">Note:</span> {expense.note}
              </p>
            )}
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
