
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    busy: 0,
    away: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/members`);

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(data);

      setStats({
        total: data.length,
        available: data.filter((m) => m.status === "Available").length,
        busy: data.filter((m) => m.status === "Busy").length,
        away: data.filter((m) => m.status === "Away").length,
      });

      setError("");
    } catch (err) {
      setError("Backend connection failed. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();

    const interval = setInterval(fetchMembers, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/members/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Status update failed");
      }

      await fetchMembers();
    } catch (err) {
      alert("Unable to update status. Please try again.");
    }
  };

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div>
          <h1>Team Availability Tracker</h1>
          <p>Manage your team's availability in real time.</p>
        </div>

        <button className="primary-button" onClick={fetchMembers}>
          Refresh Data
        </button>
      </header>

      {error && <p style={{ color: "#DC2626" }}>{error}</p>}

      <section className="stats-container">
        <div className="stat-card total">
          <h3>Total Members</h3>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card available">
          <h3>Available</h3>
          <h2>{stats.available}</h2>
        </div>

        <div className="stat-card busy">
          <h3>Busy</h3>
          <h2>{stats.busy}</h2>
        </div>

        <div className="stat-card away">
          <h3>Away</h3>
          <h2>{stats.away}</h2>
        </div>
      </section>

      <section className="team-section">
        <div className="section-heading">
          <div>
            <h2>Team Members</h2>
            <p style={{ color: "#64748B", marginTop: "6px" }}>
              Manage and update member status
            </p>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search member or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading team members...</p>
        ) : filteredMembers.length === 0 ? (
          <p>No team members found.</p>
        ) : (
          filteredMembers.map((member) => (
            <div className="member-card" key={member.id}>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.timezone}</p>
              </div>

              <span
                className={`status-badge ${member.status.toLowerCase()}`}
              >
                {member.status}
              </span>

              <select
                className="status-select"
                value={member.status}
                onChange={(e) =>
                  updateStatus(member.id, e.target.value)
                }
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Away">Away</option>
              </select>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
