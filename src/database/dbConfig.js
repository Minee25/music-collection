const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "music.db");

const musicDb = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database at:", dbPath);
  }
});
musicDb.configure("busyTimeout", 5000);

// Create table
musicDb.serialize(() => {
  musicDb.run(`
    CREATE TABLE IF NOT EXISTS music (
      music_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      youtube_link TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error("Error creating music table:", err.message);
    }
  });

  musicDb.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error("Error creating music table:", err.message);
    }
  });
});

// Database close
process.on("SIGINT", () => {
  musicDb.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

module.exports = musicDb;