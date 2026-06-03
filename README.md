# Exercise 2: Mini Expense Tracker

A full-stack expense tracking web application built with React and Express. Users can add, edit, delete, filter, and visualize their daily expenses with a clean, responsive dashboard.

## Live Demo

Deploy link here

## Tech Stack

| Library | Reason |
|---------|--------|
| **Express** | Lightweight and flexible Node.js web framework for building REST APIs |
| **Cors** | Enables cross-origin requests between the frontend and backend |
| **uuid** | Generates unique IDs for each expense entry |
| **React** | Component-based UI library for building interactive user interfaces |
| **Vite** | Fast build tool and dev server for modern frontend development |
| **Tailwind CSS** | Utility-first CSS framework for rapid and consistent styling |
| **Recharts** | Composable charting library for React to visualize category spending |

## How to Run Locally

```bash
git clone <repo>
cd expense-tracker

# Backend
cd server && npm install && node index.js

# Frontend (new terminal)
cd client && npm install && npm run dev
```

## API Documentation

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/api/expenses` | — | Array of all expenses (sorted by date descending) |
| POST | `/api/expenses` | `{ amount, category, date, note? }` | Created expense object with id and createdAt |
| PUT | `/api/expenses/:id` | `{ amount, category, date, note? }` | Updated expense object |
| DELETE | `/api/expenses/:id` | — | `{ message: "Expense deleted", expense: {...} }` |
| GET | `/api/expenses/summary` | — | `{ totalThisMonth, totalByCategory, highestExpense }` |

## Project Structure

```
expense-tracker/
├── README.md                      # Project documentation
├── server/
│   ├── package.json               # Backend dependencies and scripts
│   ├── index.js                   # Express app entry point (CORS, JSON parsing, routes)
│   ├── routes/
│   │   └── expenses.js            # REST API route handlers for expenses CRUD + summary
│   ├── utils/
│   │   ├── fileHelpers.js         # Read/write expenses from/to JSON file
│   │   └── validation.js          # Expense field validation logic
│   └── data/
│       └── expenses.json          # Persistent storage for expenses
└── client/
    ├── package.json               # Frontend dependencies and scripts
    ├── .env                       # VITE_API_URL environment variable
    ├── index.html                 # HTML entry point with Google Fonts
    ├── vite.config.js             # Vite configuration (React plugin, port 5173)
    ├── tailwind.config.js         # Tailwind CSS configuration
    ├── postcss.config.js          # PostCSS configuration for Tailwind
    └── src/
        ├── main.jsx               # React DOM entry point
        ├── App.jsx                # Root layout component composing all children
        ├── index.css              # Tailwind directives
        ├── hooks/
        │   └── useExpenses.js     # Custom hook for all API calls and state management
        ├── utils/
        │   ├── formatCurrency.js  # Indian locale currency formatting (₹X,XXX.XX)
        │   └── dateHelpers.js     # Date range and formatting helpers
        └── components/
            ├── ExpenseForm.jsx        # Add/edit expense form with validation
            ├── ExpenseTable.jsx       # Expense list with edit/delete actions
            ├── SummaryPanel.jsx       # Stats cards (month total, category breakdown, highest)
            ├── CategoryChart.jsx      # Recharts bar chart for category spending
            ├── FilterBar.jsx          # Category and date range filters
            ├── DeleteConfirmModal.jsx # Confirmation dialog for deletions
            └── EmptyState.jsx         # Empty state with message
```

## Next Steps

1. **Persistent database** — Replace the JSON file with SQLite or PostgreSQL for better concurrency and data integrity.
2. **User authentication** — Add login/register so multiple users can manage their own expenses independently.
3. **Monthly budgets** — Allow users to set monthly spending limits per category and show progress bars / alerts when nearing the limit.
