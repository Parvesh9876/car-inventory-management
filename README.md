# 🚗 Car Dealership Inventory Management System

A full-stack **Car Dealership Inventory Management System** built with the **MERN Stack**.

The application provides secure authentication, role-based access control, vehicle inventory management, purchasing, restocking, and search/filter functionality.

---

## 🌐 Live Demo

### Frontend

**Live Application:**  
https://cardealership-12.netlify.app

### Deployment

| Service | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | MongoDB Atlas |

> The Render backend may take a few seconds to respond after being inactive.

---

# 🔐 Demo Credentials

## Admin Account

Use this account to test all inventory-management functionality.

```text
Email:    admin@gmail.com
Password: password123
```

### Admin Can

- View vehicles
- Search and filter vehicles
- Purchase vehicles
- Add new vehicles
- Edit vehicles
- Delete vehicles
- Restock inventory

---

## 👤 Normal User / Customer

You do **not** need demo credentials for a normal user.

1. Open the live application.
2. Click **Register**.
3. Create a new account.
4. Login using your new account.

Newly registered accounts are assigned the **normal user/customer** role.

### Normal User Can

- View vehicles
- Search vehicles
- Filter vehicles
- Purchase available vehicles

Normal users **cannot** add, edit, delete, or restock vehicles.

---

# ✨ Main Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Role-Based Authorization

### Vehicle Inventory

- View Vehicles
- Search Vehicles
- Filter by Category
- Filter by Price Range
- Purchase Vehicles
- Stock Management

### Admin Inventory Management

- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Restock Vehicle

### Backend Engineering

- Layered Architecture
- Request Validation
- Centralized Error Handling
- Atomic Inventory Updates
- Jest + Supertest Testing
- Test-Driven Development for critical backend functionality

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator

## Testing

- Jest
- Supertest

## Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

---

# 📁 Project Structure

```text
car-inventory-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docs/
│   └── PROJECT_DOCUMENTATION.md
│
└── README.md
```

---

# 🚀 Run Project Locally

## 1. Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd car-inventory-management
```

---

# ⚙️ Backend Setup

Move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add the required environment variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

MONGODB_TEST_URI=your_test_database_connection_string

JWT_SECRET=your_jwt_secret
```

> Never commit your real `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

If the project uses `npm start` for production:

```bash
npm start
```

The backend will run on the configured port.

Example:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open a **new terminal** from the project root.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local application URL in the terminal.

Usually:

```text
http://localhost:5173
```

---

# 🧪 Run Backend Tests

Move into the backend:

```bash
cd backend
```

Run:

```bash
npm test
```

The backend test suite covers critical functionality including:

- Registration
- Login
- Password hashing
- Duplicate email handling
- JWT authentication
- Vehicle purchasing
- Out-of-stock handling
- Vehicle restocking
- Role-based authorization

A completed development checkpoint produced:

```text
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
```

---

# ⚡ Quick Start

If dependencies and environment variables are already configured:

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 📚 Documentation

Detailed technical documentation is intentionally kept separate from this README.

For architecture, API design, database design, authentication, authorization, testing strategy, TDD workflow, deployment architecture, business rules, and engineering decisions, see:

### 📘 [Project Documentation](./docs/PROJECT_DOCUMENTATION.md)

AI-assisted development details are documented separately in:

### 🤖 [AI-Assisted Development Log](./PROMPTS.md)

---

# 🔒 Security

The application implements:

- Password hashing with bcrypt
- JWT authentication
- Backend role-based authorization
- Request validation
- Protected administrator endpoints
- Environment-based secrets
- Centralized API error handling

Sensitive values such as MongoDB credentials and JWT secrets must **never be committed to the repository**.

---

# 🌍 Production Architecture

```text
User
 │
 ▼
Netlify
React + Vite Frontend
 │
 │ HTTPS REST API
 ▼
Render
Node.js + Express Backend
 │
 │ Mongoose
 ▼
MongoDB Atlas
```

---

# 👨‍💻 Author

**Parvesh Kumar**

B.Tech Computer Science & Engineering

---

# 📄 License

This project was developed as part of a technical assessment.