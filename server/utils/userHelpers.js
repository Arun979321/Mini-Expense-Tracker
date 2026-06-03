const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const USER_FILE = path.join(DATA_DIR, 'users.json');

function ensureUserFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USER_FILE)) {
    fs.writeFileSync(USER_FILE, '[]', 'utf-8');
  }
}

function readUsers() {
  ensureUserFile();
  const raw = fs.readFileSync(USER_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeUsers(users) {
  ensureUserFile();
  fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

module.exports = { readUsers, writeUsers };
