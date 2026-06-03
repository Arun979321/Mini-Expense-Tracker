const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'expenses.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

function readExpenses() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeExpenses(expenses) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), 'utf-8');
}

module.exports = { readExpenses, writeExpenses };
