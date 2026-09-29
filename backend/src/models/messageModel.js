const db = require("../db/database");

function createMessage(username, message) {
  const statement = db.prepare(`
    INSERT INTO messages (username, message)
    VALUES (?, ?)
  `);

  const result = statement.run(username, message);

  return db.prepare(`
    SELECT * FROM messages WHERE id = ?
  `).get(result.lastInsertRowid);
}

function getMessages() {
  return db.prepare(`
    SELECT * FROM messages
    ORDER BY timestamp ASC, id ASC
  `).all();
}

module.exports = {
  createMessage,
  getMessages
};