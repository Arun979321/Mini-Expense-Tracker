const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

export default function FilterBar({
  filterCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  customStart,
  onCustomStartChange,
  customEnd,
  onCustomEndChange,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
          <div className="flex gap-1">
            {['thisMonth', 'lastMonth', 'custom'].map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'thisMonth' ? 'This Month' : range === 'lastMonth' ? 'Last Month' : 'Custom'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {dateRange === 'custom' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => onCustomStartChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => onCustomEndChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
