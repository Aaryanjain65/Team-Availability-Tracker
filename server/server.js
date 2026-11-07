
const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.json({
        message: "Team Availability Tracker API is running!"
    });
});

// Get all team members
app.get("/api/members", (req, res) => {
    const members = db.prepare(
        "SELECT * FROM team_members ORDER BY id"
    ).all();

    res.json(members);
});

// Get team member by ID
app.get("/api/members/:id", (req, res) => {
    const member = db.prepare(
        "SELECT * FROM team_members WHERE id = ?"
    ).get(req.params.id);

    if (!member) {
        return res.status(404).json({
            error: "Team member not found"
        });
    }

    res.json(member);
});

// Update team member status
app.patch("/api/members/:id/status", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = ["Available", "Busy", "Away"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            error: "Invalid status"
        });
    }

    const result = db.prepare(
        "UPDATE team_members SET status = ? WHERE id = ?"
    ).run(status, id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Team member not found"
        });
    }

    res.json({
        message: "Status updated successfully",
        id: Number(id),
        status
    });
});

// Dashboard statistics
app.get("/api/stats", (req, res) => {
    const stats = db.prepare(`
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available,
            SUM(CASE WHEN status = 'Busy' THEN 1 ELSE 0 END) AS busy,
            SUM(CASE WHEN status = 'Away' THEN 1 ELSE 0 END) AS away
        FROM team_members
    `).get();

    res.json(stats);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
