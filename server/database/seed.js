
const db = require("./db");
const fs = require("fs");
const path = require("path");

const seedPath = path.join(
    __dirname,
    "../data/team_availability_seed.json"
);

const members = JSON.parse(
    fs.readFileSync(seedPath, "utf8")
);

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

console.log(`${members.length} team members imported successfully!`);

db.close();

