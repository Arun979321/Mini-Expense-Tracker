const VALID_CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function validateExpense(body) {
  const errors = [];

  if (body.amount === undefined || body.amount === null) {
    errors.push('Amount is required');
  } else {
    const num = Number(body.amount);
    if (isNaN(num) || num <= 0) {
      errors.push('Amount must be a positive number');
    }
  }

  if (!body.category) {
    errors.push('Category is required');
  } else if (!VALID_CATEGORIES.includes(body.category)) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!body.date) {
    errors.push('Date is required');
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(body.date)) {
      errors.push('Date must be in YYYY-MM-DD format');
    } else {
      const expenseDate = new Date(body.date + 'T00:00:00');
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (expenseDate > today) {
        errors.push('Date cannot be in the future');
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = { validateExpense, VALID_CATEGORIES };
