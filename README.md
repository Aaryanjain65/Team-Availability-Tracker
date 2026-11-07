# Team Availability Tracker

A real-time team availability management dashboard that helps monitor and update team members' working status.

## Live Demo

**Frontend:** https://team-availability-tracker-mauve.vercel.app/

**Backend API:** https://team-availability-tracker-rczp.onrender.com/

## Features

- Manage 40 team members.
- Update member status to Available, Busy, or Away.
- Dashboard with real-time status statistics.
- Search team members by name or role.
- Automatic data refresh every 5 seconds.
- Responsive dashboard interface.
- SQLite database integration.

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- REST API

### Database
- SQLite
- better-sqlite3

### Deployment
- Vercel
- Render

## Project Structure

```text
Team-Availability-Tracker/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── server/
    ├── database/
    │   ├── db.js
    │   └── seed.js
    ├── data/
    │   └── team_availability_seed.json
    ├── server.js
    └── package.json
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aaryanjain65/Team-Availability-Tracker.git
```

### 2. Backend Setup

```bash
cd Team-Availability-Tracker/server
npm install
node database/seed.js
npm start
```

The backend runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open another terminal:

```bash
cd Team-Availability-Tracker/client
npm install
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/members` | Get all team members |
| GET | `/api/members/:id` | Get a team member by ID |
| PATCH | `/api/members/:id/status` | Update member status |
| GET | `/api/stats` | Get dashboard statistics |

## Available Status Options

- Available
- Busy
- Away

## Author

**Aaryan Jain**

BCA Student

GitHub: https://github.com/Aaryanjain65

## License

This project is created for educational and learning purposes.