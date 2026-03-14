const Database = require("better-sqlite3");

// create database
const db = new Database("journal.db");

// create table
db.prepare(`
CREATE TABLE IF NOT EXISTS journals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT,
  ambience TEXT,
  text TEXT,
  emotion TEXT,
  keywords TEXT,
  summary TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();


console.log("SQLite database connected");

module.exports = db;