
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "team.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS team_members (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL CHECK (
            status IN ('Available', 'Busy', 'Away')
        ),
        timezone TEXT NOT NULL
    );
`);

console.log("SQLite Database Connected");
console.log("Team Members Table Created");

module.exports = db;
