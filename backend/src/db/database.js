const Database = require("better-sqlite3");
const path = require("path");

// Create database inside backend folder
const dbPath = path.join(__dirname, "../../chat.db");

const db = new Database(dbPath);

// Create messages table
db.prepare(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("SQLite database connected");

module.exports = db;