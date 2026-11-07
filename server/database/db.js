
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// Connect SQLite Database
const dbPath = path.join(__dirname, "team.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

// Create Team Members Table
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

// Load Seed Data
const seedPath = path.join(
    __dirname,
    "../data/team_availability_seed.json"
);

const members = JSON.parse(
    fs.readFileSync(seedPath, "utf8")
);

// Insert Members Without Duplicates
const insert = db.prepare(`
    INSERT OR IGNORE INTO team_members
    (id, name, role, status, timezone)
    VALUES (?, ?, ?, ?, ?)
`);

const importMembers = db.transaction((data) => {
    for (const member of data) {
        insert.run(
            member.id,
            member.name,
            member.role,
            member.status,
            member.timezone
        );
    }
});

importMembers(members);

console.log("SQLite Database Connected");
console.log("Team Members Table Created");
console.log(`${members.length} team members loaded successfully!`);

module.exports = db;
