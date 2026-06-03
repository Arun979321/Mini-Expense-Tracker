# Mini Expense Tracker

A full-stack expense tracking web application built with React and Express. Users can add, edit, delete, filter, and visualize daily expenses through a clean responsive dashboard. Features JWT-based authentication so each user manages their own expenses independently, with account creation, login, and account deletion.

## Live Demo

[Frontend (Vercel/Netlify)](https://your-deployed-frontend-url.com)
[Backend (Render/Railway)](https://your-deployed-backend-url.com)

## Tech Stack

| Library            | Reason                                                        |
| ------------------ | ------------------------------------------------------------- |
| **Express**        | Lightweight Node.js framework for building REST APIs          |
| **bcryptjs**       | Password hashing before storing user credentials              |
| **jsonwebtoken**   | Stateless JWT-based authentication tokens                     |
| **Cors**           | Enables cross-origin requests between frontend and backend    |
| **uuid**           | Generates unique IDs for expenses and users                   |
| **React**          | Component-based UI library for interactive interfaces         |
| **Vite**           | Fast build tool and dev server                                |
| **Tailwind CSS**   | Utility-first CSS framework for rapid consistent styling      |
| **Recharts**       | Composable React charting library for category spending       |
| **react-router-dom** | Client-side routing for login, signup, and protected pages |

## How to Run Locally

**Prerequisites:** Node.js (v18 or later)

```bash
# Clone the repository
git clone https://github.com/Arun979321/Mini-Expense-Tracker.git
cd Mini-Expense-Tracker

# Backend setup
cd server
npm install
npm start
# Server runs on http://localhost:5000

# Frontend setup (new terminal)
cd client
npm install
npm run dev
# Client runs on http://localhost:5173
```

Then open http://localhost:5173 in your browser. Register a new account to get started.

## API Documentation

### Authentication

| Method   | Path                 | Auth Required | Body                                     | Response                                                        |
| -------- | -------------------- | ------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `POST`   | `/api/auth/register` | No            | `{ "email": "string", "password": "string" }` | `{ "token": "string", "user": { "id": "string", "email": "string" } }` |
| `POST`   | `/api/auth/login`    | No            | `{ "email": "string", "password": "string" }` | `{ "token": "string", "user": { "id": "string", "email": "string" } }` |
| `DELETE` | `/api/auth/account`  | Yes           | `{ "password": "string" }`               | `{ "message": "Account deleted successfully" }`                |

### Expenses (all endpoints require `Authorization: Bearer <token>` header)

| Method   | Path                  | Body                                                | Response                                                              |
| -------- | --------------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| `GET`    | `/api/expenses`       | —                                                   | Array of user&apos;s expenses (sorted by date descending)             |
| `GET`    | `/api/expenses/summary` | —                                                 | `{ "totalThisMonth": number, "totalByCategory": object, "highestExpense": object }` |
| `POST`   | `/api/expenses`       | `{ "amount": number, "category": string, "date": "YYYY-MM-DD", "note?": string }` | Created expense object with `id` and `createdAt`                      |
| `PUT`    | `/api/expenses/:id`   | `{ "amount": number, "category": string, "date": "YYYY-MM-DD", "note?": string }` | Updated expense object                                                |
| `DELETE` | `/api/expenses/:id`   | —                                                   | `{ "message": "Expense deleted", "expense": {...} }`                  |

**Valid categories:** `Food`, `Transport`, `Bills`, `Entertainment`, `Other`

## Project Structure

```
Mini-Expense-Tracker/
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation
├── server/
│   ├── package.json             # Backend dependencies
│   ├── index.js                 # Express app entry point (CORS, routes)
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Register, login, delete account endpoints
│   │   └── expenses.js          # CRUD + summary endpoints (protected)
│   ├── utils/
│   │   ├── fileHelpers.js       # Read/write expenses JSON file
│   │   ├── userHelpers.js       # Read/write users JSON file
│   │   └── validation.js        # Expense field validation
│   └── data/
│       ├── expenses.json        # Persistent expense storage
│       └── users.json           # Persistent user storage (auto-created)
└── client/
    ├── package.json             # Frontend dependencies
    ├── .env                     # VITE_API_URL environment variable
    ├── index.html               # HTML entry point
    ├── vite.config.js           # Vite configuration
    ├── tailwind.config.js       # Tailwind CSS configuration
    ├── postcss.config.js        # PostCSS configuration
    └── src/
        ├── main.jsx             # React DOM entry with BrowserRouter
        ├── App.jsx              # Root layout with auth-aware header
        ├── index.css            # Tailwind directives
        ├── context/
        │   └── AuthContext.jsx  # Auth state, login/signup/logout/delete account
        ├── hooks/
        │   └── useExpenses.js   # Custom hook for all API calls with JWT
        ├── utils/
        │   ├── formatCurrency.js  # ₹ currency formatting
        │   └── dateHelpers.js     # Date range helpers
        └── components/
            ├── ExpenseForm.jsx        # Add/edit expense form
            ├── ExpenseTable.jsx       # Expense list with actions
            ├── SummaryPanel.jsx       # Stats cards
            ├── CategoryChart.jsx      # Bar chart by category
            ├── FilterBar.jsx          # Category and date filters
            ├── DeleteConfirmModal.jsx # Confirmation for expense deletion
            ├── DeleteAccountModal.jsx  # Password confirmation for account deletion
            ├── EmptyState.jsx         # Empty state placeholder
            ├── Login.jsx              # Sign-in form
            ├── Signup.jsx             # Registration form
            └── ProtectedRoute.jsx     # Redirects to /login if unauthenticated
```

## Next Steps

1. **Persistent database** — Replace JSON files with SQLite or PostgreSQL for better concurrency and data integrity.
2. **Monthly budgets** — Allow users to set monthly spending limits per category with progress bars and alerts.
3. **Email verification** — Send a confirmation email on registration to verify user accounts.
4. **Password reset** — Add a "forgot password" flow with email-based reset tokens.
5. **Deployment CI/CD** — Automate frontend and backend deployment via GitHub Actions.
