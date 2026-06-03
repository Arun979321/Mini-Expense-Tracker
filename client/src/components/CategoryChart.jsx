import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

const CATEGORY_CONFIG = {
  Food: { fill: '#22c55e' },
  Transport: { fill: '#3b82f6' },
  Bills: { fill: '#ef4444' },
  Entertainment: { fill: '#a855f7' },
  Other: { fill: '#6b7280' },
};

export default function CategoryChart({ totalByCategory }) {
  const chartData = Object.entries(totalByCategory)
    .filter(([, amount]) => amount > 0)
    .map(([name, amount]) => ({
      name,
      amount,
      fill: CATEGORY_CONFIG[name]?.fill || '#6b7280',
    }));

  if (chartData.length === 0) return null;

  function CustomTooltip({ active, payload }) {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-gray-600">{formatCurrency(data.amount)}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickFormatter={(v) => `₹${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={80} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
