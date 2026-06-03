const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readExpenses, writeExpenses } = require('../utils/fileHelpers');
const { validateExpense, VALID_CATEGORIES } = require('../utils/validation');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  try {
    const expenses = readExpenses().filter((e) => e.userId === req.user.id);
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read expenses' });
  }
});

router.get('/summary', authMiddleware, (req, res) => {
  try {
    const expenses = readExpenses().filter((e) => e.userId === req.user.id);
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const thisMonthExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return d >= monthStart && d <= monthEnd;
    });

    const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const totalByCategory = {};
    VALID_CATEGORIES.forEach((cat) => {
      totalByCategory[cat] = expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
    });

    const highestExpense = expenses.length > 0
      ? expenses.reduce((max, e) => (e.amount > max.amount ? e : max), expenses[0])
      : null;

    res.json({ totalThisMonth, totalByCategory, highestExpense });
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute summary' });
  }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { valid, errors } = validateExpense(req.body);
    if (!valid) {
      return res.status(400).json({ error: errors.join('; ') });
    }

    const expense = {
      id: uuidv4(),
      userId: req.user.id,
      amount: Number(req.body.amount),
      category: req.body.category,
      date: req.body.date,
      note: req.body.note || '',
      createdAt: new Date().toISOString(),
    };

    const expenses = readExpenses();
    expenses.push(expense);
    writeExpenses(expenses);

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { valid, errors } = validateExpense(req.body);
    if (!valid) {
      return res.status(400).json({ error: errors.join('; ') });
    }

    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e.id === req.params.id && e.userId === req.user.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses[index] = {
      ...expenses[index],
      amount: Number(req.body.amount),
      category: req.body.category,
      date: req.body.date,
      note: req.body.note || '',
    };

    writeExpenses(expenses);
    res.json(expenses[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const expenses = readExpenses();
    const index = expenses.findIndex((e) => e.id === req.params.id && e.userId === req.user.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const removed = expenses.splice(index, 1);
    writeExpenses(expenses);
    res.json({ message: 'Expense deleted', expense: removed[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
