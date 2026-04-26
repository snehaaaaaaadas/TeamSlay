# TeamSlay — MERN Stack Team Management App

A full-stack team member management app built with the MERN stack. Bold Y2K brutalist UI design.

## 🎨 UI Style
**TeamSlay** — Y2K Brutalist: cream/off-white background, thick black borders, lime green + hot pink accents, chunky box shadows, monospace + display fonts.

## 🛠 Tech Stack
- **Frontend**: React.js, React Router DOM, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer

## 📁 Project Structure
```
TeamSlay/
├── backend/
│   ├── models/Member.js
│   ├── routes/members.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js / Navbar.css
    │   │   └── Ticker.js / Ticker.css
    │   ├── pages/
    │   │   ├── HomePage.js / HomePage.css
    │   │   ├── AddMemberPage.js / AddMemberPage.css
    │   │   ├── ViewMembersPage.js / ViewMembersPage.css
    │   │   └── MemberDetailsPage.js / MemberDetailsPage.css
    │   ├── App.js / App.css
    │   └── index.js / index.css
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB running on localhost:27017

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/TeamSlay.git
cd TeamSlay
```

### 2. Start the backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at `http://localhost:5000`

### 3. Start the frontend
```bash
cd frontend
npm install
npm start
```
App runs at `http://localhost:3000`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | Get all team members |
| GET | `/api/members/:id` | Get a single member by ID |
| POST | `/api/members` | Add new member (multipart/form-data) |
| DELETE | `/api/members/:id` | Delete a member |

### Test in Browser
```
GET http://localhost:5000/api/members
GET http://localhost:5000/api/members/<member_id>
```

## 📋 Environment Variables
`backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/teamapp
```
