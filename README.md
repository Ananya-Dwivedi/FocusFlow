# ⚡ FocusFlow | Full-Stack Productivity Management System

A full-stack task and project management application built to streamline task organization, track productivity, and manage workflows through a centralized dashboard.

## ✨ Core Features

- 🔐 **Authentication & Authorization** — JWT-based authentication with bcrypt password hashing.
- 📋 **Task CRUD Operations** — Create, retrieve, update, and delete tasks.
- 🗂️ **Project Management** — Organize and manage tasks within projects.
- 🔍 **Task Filtering** — Search, filter, and sort tasks efficiently.
- 📊 **Dashboard Analytics** — Monitor task statistics and productivity progress.
- 🌓 **Theme Management** — Light and dark mode support.
- 🔄 **State Management** — Context API and useReducer for structured application state.

## 🧰 Technology Stack

| Layer            | Technologies              |
| ---------------- | ------------------------- |
| Frontend         | React 19, JavaScript, CSS |
| Build Tool       | Vite                      |
| Routing          | React Router              |
| State Management | Context API, useReducer   |
| Backend          | Node.js, Express.js       |
| Database         | PostgreSQL                |
| Authentication   | JWT, bcrypt               |
| API Testing      | Postman                   |
| Version Control  | Git, GitHub               |

## 🏗️ Architecture

```text
FocusFlow/
│
├── frontend/             # React + Vite
│   ├── src/
│   └── public/
│
├── backend/              # Node.js + Express
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
└── README.md
```

**Application Flow:**

`React UI → REST API → Express Routes → Controllers → PostgreSQL`

## ⚙️ Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/Ananya-Dwivedi/FocusFlow.git
cd FocusFlow
```

**2. Install frontend dependencies**

```bash
cd frontend
npm install
```

**3. Install backend dependencies**

```bash
cd ../backend
npm install
```

**4. Configure environment variables**

Create `backend/.env` and configure your PostgreSQL connection details and JWT secret.

**5. Start the application**

Run the backend using its configured npm script, then start the frontend:

```bash
cd frontend
npm run dev
```

Ensure PostgreSQL is running and the frontend API URL points to your backend server.

## 📡 API Modules

| Module         | Endpoint         |
| -------------- | ---------------- |
| Authentication | `/api/auth`      |
| Tasks          | `/api/tasks`     |
| Projects       | `/api/projects`  |
| Dashboard      | `/api/dashboard` |

## 💡 Key Technical Concepts

- Component-based frontend architecture
- React hooks and centralized state management
- RESTful API design and integration
- Express MVC architecture
- JWT authentication and password hashing
- PostgreSQL queries and relational data management
- Middleware-based request handling and validation

## 👩‍💻 Developer

**Ananya Dwivedi**

[GitHub Profile](https://github.com/Ananya-Dwivedi)

---

<p align="center">
  <b>⚡ FocusFlow — Organize. Execute. Improve.</b>
</p>
