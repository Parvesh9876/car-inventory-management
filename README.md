# Car Inventory Management System

A full-stack dealership inventory management application built with the MERN stack. The system provides secure authentication, role-based authorization, vehicle inventory management, stock operations, purchasing, and advanced vehicle filtering.

The backend follows a layered architecture and was developed using Test-Driven Development (TDD) practices for critical business functionality.

---
## 🌐 Live Demo

The application is deployed and available at:

**Live Application:**  
https://cardealership-12.netlify.app/login

---

## 🔐 Demo Credentials

### Administrator Account

Use the following credentials to explore the **Admin Dashboard** and inventory management features.

| Field | Value |
|---|---|
| **Email** | `admin@gmail.com` |
| **Password** | `password123` |
| **Role** | Administrator |

The administrator can:

- Add new vehicles
- Edit vehicle details
- Delete vehicles
- Restock inventory
- Search and filter vehicles
- Purchase vehicles
- View and manage the complete inventory

---

### Customer / Normal User

A separate demo account is **not required** for customer access.

To test the application as a normal user:

1. Open the application.
2. Navigate to **Register**.
3. Create a new account using your own test credentials.
4. The newly created account will automatically be assigned the **User/Customer** role.
5. Log in using the newly created account.

Normal users can:

- Browse available vehicles
- Search vehicles by make or model
- Filter vehicles by category and price
- View vehicle availability
- Purchase vehicles

Normal users **cannot** add, edit, delete, or restock vehicles.

---


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Backend Architecture](#backend-architecture)
- [Project Structure](#project-structure)
- [Authentication and Authorization](#authentication-and-authorization)
- [Inventory Business Rules](#inventory-business-rules)
- [API Reference](#api-reference)
- [Search and Filtering](#search-and-filtering)
- [Test-Driven Development](#test-driven-development)
- [Testing](#testing)
- [Security](#security)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Engineering Decisions](#engineering-decisions)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [AI-Assisted Development](#ai-assisted-development)

---

## Overview

The **Car Inventory Management System** is designed for vehicle dealerships that require a centralized system for managing vehicle inventory.

The application separates normal users from administrators through role-based access control.

Administrators can manage inventory while authenticated users can browse available vehicles and purchase vehicles that are currently in stock.

The system was designed with emphasis on:

- Maintainable backend architecture
- RESTful API design
- Secure authentication
- Role-based authorization
- Data validation
- Atomic inventory operations
- Automated testing
- Clear separation of concerns
- Responsive frontend design

---

## Key Features

### Authentication

- User registration
- User login
- Password hashing
- JWT-based authentication
- Protected API endpoints
- Role-based access control

### Vehicle Inventory

- View available vehicles
- Add vehicles
- Update vehicle information
- Delete vehicles
- Search vehicles
- Filter by category
- Filter by minimum price
- Filter by maximum price
- Purchase vehicles
- Restock inventory
- Real-time inventory refresh after operations

### Administrator Operations

Administrators can:

- Add new vehicles
- Edit vehicle information
- Delete vehicles
- Restock vehicles
- View inventory
- Search and filter inventory
- Purchase vehicles

### User Operations

Authenticated users can:

- View inventory
- Search vehicles
- Filter vehicles
- Purchase vehicles

Administrative controls are not displayed to normal users in the frontend and are independently protected by backend authorization middleware.

---

## User Roles

| Capability | User | Administrator |
|---|:---:|:---:|
| Register | Yes | Yes* |
| Login | Yes | Yes |
| View vehicles | Yes | Yes |
| Search vehicles | Yes | Yes |
| Filter inventory | Yes | Yes |
| Purchase vehicle | Yes | Yes |
| Add vehicle | No | Yes |
| Edit vehicle | No | Yes |
| Delete vehicle | No | Yes |
| Restock vehicle | No | Yes |

> `*` Role assignment should follow the application's configured registration/administration policy. Backend authorization remains the final authority for protected operations.

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend

- Node.js
- Express.js
- JavaScript
- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- Password hashing
- Helmet
- CORS
- Express Validator

### Testing

- Jest
- Supertest
- Dedicated MongoDB test database

### Development Tools

- Git
- GitHub
- npm
- Postman
- VS Code

---

## System Architecture

```text
┌─────────────────────────────┐
│        React Client         │
│      Vite + Tailwind        │
└──────────────┬──────────────┘
               │
               │ HTTP / REST
               │ JWT
               ▼
┌─────────────────────────────┐
│        Express API          │
│                             │
│ Routes                      │
│     ↓                       │
│ Middleware                  │
│     ↓                       │
│ Controllers                 │
│     ↓                       │
│ Services                    │
│     ↓                       │
│ Mongoose Models             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        MongoDB Atlas        │
│                             │
│ Users                       │
│ Vehicles                    │
└─────────────────────────────┘
```

The frontend does not communicate directly with the database.

All database operations pass through the backend API, where authentication, authorization, validation, and business rules are enforced.

---

## Backend Architecture

The backend follows a layered architecture.

```text
HTTP Request
     │
     ▼
Route
     │
     ▼
Validation Middleware
     │
     ▼
Authentication Middleware
     │
     ▼
Authorization Middleware
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Mongoose Model
     │
     ▼
MongoDB
```

### Routes

Routes define API endpoints and connect middleware with controllers.

### Middleware

Middleware handles cross-cutting concerns such as:

- JWT authentication
- Administrator authorization
- Request validation
- Object ID validation
- Centralized error handling

### Controllers

Controllers handle HTTP-specific responsibilities:

- Reading request data
- Calling services
- Selecting response status codes
- Returning JSON responses
- Forwarding errors

### Services

Services contain application business logic.

Examples include:

- Registering users
- Authenticating users
- Creating vehicles
- Searching inventory
- Purchasing vehicles
- Restocking vehicles

### Models

Mongoose models define the application's persistent data structure and database-level validation.

---

## Project Structure

```text
car-inventory-management/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── vehicle.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── admin.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   └── validateObjectId.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Vehicle.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── vehicle.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── vehicle.service.js
│   │   │
│   │   ├── tests/
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   └── vehicle.validator.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── admin/
│   │   │
│   │   ├── context/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Authentication and Authorization

Authentication is implemented using JSON Web Tokens.

### Authentication Flow

```text
User submits credentials
        │
        ▼
Backend validates request
        │
        ▼
User retrieved from MongoDB
        │
        ▼
Password verified
        │
        ▼
JWT generated
        │
        ▼
Token returned to frontend
        │
        ▼
Frontend sends token with protected requests
        │
        ▼
Authentication middleware verifies JWT
        │
        ▼
Request continues
```

The JWT contains information required to identify the authenticated user and determine their role.

### Authorization

Authentication answers:

> Who is making this request?

Authorization answers:

> Is this user allowed to perform this operation?

Administrator-only endpoints use authorization middleware after authentication.

```text
Request
   │
   ▼
JWT Authentication
   │
   ▼
Role Check
   │
   ├── Admin ─────► Continue
   │
   └── User ──────► 403 Forbidden
```

Frontend role checks improve the user experience, but backend authorization remains the security boundary.

---

## Inventory Business Rules

### Purchasing

Purchasing a vehicle decreases its quantity by one.

The database update is performed atomically and only succeeds when:

```text
quantity > 0
```

Conceptually:

```javascript
{
  _id: vehicleId,
  quantity: { $gt: 0 }
}
```

with:

```javascript
{
  $inc: {
    quantity: -1
  }
}
```

This prevents the inventory quantity from becoming negative.

If the vehicle exists but has no remaining inventory, the API returns an out-of-stock response.

### Restocking

Restocking increases inventory using MongoDB's `$inc` operator.

```javascript
{
  $inc: {
    quantity: quantityToAdd
  }
}
```

Restock quantity must be at least `1`.

### Vehicle Updates

Vehicle updates use Mongoose validation to ensure modified data remains valid.

### Vehicle Deletion

Deletion is restricted to administrators.

A request for a vehicle that does not exist returns an appropriate `404` response.

---

## API Reference

Base API path:

```text
/api
```

### Authentication

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new account |
| POST | `/auth/login` | No | Authenticate and receive JWT |

### Vehicles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/vehicles` | Authenticated | Retrieve vehicle inventory |
| GET | `/vehicles/search` | Authenticated | Search/filter vehicles |
| POST | `/vehicles` | Admin | Create vehicle |
| PUT | `/vehicles/:id` | Admin | Update vehicle |
| DELETE | `/vehicles/:id` | Admin | Delete vehicle |
| POST | `/vehicles/:id/purchase` | Authenticated | Purchase one vehicle |
| POST | `/vehicles/:id/restock` | Admin | Increase stock |

### Example: Restock

```json
{
  "quantity": 5
}
```

### Example: Search

```text
GET /api/vehicles/search?search=Toyota&category=SUV&minPrice=20000&maxPrice=50000
```

---

## Search and Filtering

Inventory can be filtered using optional query parameters.

Supported filters include:

| Parameter | Purpose |
|---|---|
| `search` | Search vehicle make or model |
| `make` | Filter directly by make |
| `model` | Filter directly by model |
| `category` | Filter by vehicle category |
| `minPrice` | Minimum vehicle price |
| `maxPrice` | Maximum vehicle price |

General search uses case-insensitive partial matching.

For example:

```text
search=Toyota
```

can match a vehicle whose make contains `Toyota`.

Similarly:

```text
search=Fortuner
```

can match a vehicle whose model contains `Fortuner`.

Combined filtering behaves conceptually as:

```text
(make OR model)
       AND
category
       AND
price range
```

The frontend also prevents a minimum price greater than the maximum price from being submitted.

---

## Test-Driven Development

Critical backend functionality was developed using the **Red → Green → Refactor** TDD cycle.

### 1. Red

A test was written describing the required behavior before the implementation was complete.

The test initially failed.

```text
Requirement
     ↓
Write Test
     ↓
RED ❌
```

### 2. Green

The minimum implementation required to satisfy the test was added.

```text
Failing Test
     ↓
Implementation
     ↓
GREEN ✅
```

### 3. Refactor

Once the behavior was protected by tests, implementation details could be improved while continuously running the test suite.

```text
GREEN
  ↓
Refactor
  ↓
Run Tests
  ↓
GREEN
```

### Why TDD Was Used

TDD helped:

- Define expected behavior before implementation
- Detect regressions early
- Verify database persistence
- Verify password hashing
- Verify authentication
- Test authorization boundaries
- Verify stock operations
- Improve confidence during refactoring

The goal was not to maximize test count, but to protect important business behavior.

---

## Testing

Backend tests are implemented with:

- Jest
- Supertest
- MongoDB test database

Tests cover critical functionality including authentication and inventory operations.

Examples include:

- Successful user registration
- User persistence
- Password hashing
- Duplicate email handling
- JWT generation
- Successful login
- Invalid login credentials
- Request validation
- Vehicle purchasing
- Out-of-stock protection
- Missing vehicle handling
- Vehicle restocking
- Administrator authorization

### Run Tests

From the backend directory:

```bash
npm test
```

### Run Coverage

```bash
npm test -- --coverage
```

During development, the regression suite reached:

```text
Test Suites: 4 passed
Tests:       15 passed
```

> Test counts may increase as the project evolves. The current repository test output should be treated as the final source of truth.

---

## Security

The application implements multiple security controls.

### Password Security

Passwords are hashed before being stored.

Plain-text passwords are never intentionally persisted.

### JWT Authentication

Protected endpoints require a valid JWT.

Invalid or expired tokens are rejected by authentication middleware.

### Role-Based Authorization

Administrative operations are protected by backend role checks.

Hiding an administrator button in React is **not** treated as authorization.

### Request Validation

Incoming data is validated before business logic executes.

Validation includes:

- Required vehicle fields
- Non-negative prices
- Non-negative inventory
- Positive restock quantities
- Search parameter validation
- Authentication input validation

### HTTP Security

Helmet is used to configure security-related HTTP headers.

### Secrets

Secrets are stored in environment variables and must not be committed to source control.

Examples include:

- MongoDB credentials
- JWT secrets
- Production API URLs

---

## Environment Variables

Never commit production `.env` files.

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGODB_URI=<your-mongodb-connection-string>

MONGODB_TEST_URI=<your-test-database-connection-string>

JWT_SECRET=<your-secure-jwt-secret>
```

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-backend-domain.example/api
```

---

## Local Development

### Prerequisites

Install:

- Node.js
- npm
- Git
- MongoDB Atlas account or compatible MongoDB instance

### 1. Clone Repository

```bash
git clone <repository-url>
cd car-inventory-management
```

### 2. Backend Installation

```bash
cd backend
npm install
```

Create the backend `.env` file using the variables described above.

Start the development server:

```bash
npm run dev
```

The backend will run using the configured `PORT`.

### 3. Frontend Installation

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

and configure:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Vite:

```bash
npm run dev
```

Open the URL displayed by Vite in the terminal.

---

## Deployment

The application can be deployed using separate frontend and backend services.

```text
Browser
   │
   ▼
Frontend Hosting
(Netlify)
   │
   │ HTTPS REST requests
   ▼
Backend Hosting
(Node.js / Express)
   │
   ▼
MongoDB Atlas
```

### Frontend — Netlify

Recommended build configuration:

```text
Base directory:    frontend
Build command:     npm run build
Publish directory: dist
```

Production environment variable:

```env
VITE_API_URL=https://your-backend-domain.example/api
```

For React Router SPA fallback, create:

```text
frontend/public/_redirects
```

with:

```text
/*    /index.html   200
```

### Backend

The backend requires a hosting platform capable of running a Node.js/Express server.

Configure production environment variables on the hosting platform instead of committing them to Git.

### MongoDB

MongoDB Atlas can be used as the managed database service.

Production and test databases should remain logically separated.

---

## Engineering Decisions

### Separate Service Layer

Business logic is placed in services rather than directly inside route handlers.

This makes the application easier to:

- Test
- Maintain
- Refactor
- Extend

### Backend-Enforced Authorization

React conditionally displays administrator controls, but backend middleware independently validates permissions.

This prevents users from bypassing authorization by manually calling the API.

### Atomic Inventory Updates

Purchase and restock operations use MongoDB atomic update operators.

This is safer than:

```text
Read quantity
     ↓
Modify quantity in application
     ↓
Save quantity
```

because multiple requests could otherwise operate on stale values.

### Dedicated Test Database

Automated tests use a dedicated test database rather than intentionally operating on production application data.

This provides better isolation and reduces the risk of test data affecting real inventory.

### Centralized Error Handling

Application errors flow through centralized Express error-handling middleware, producing more consistent API responses.

### Validation Before Business Logic

Request validation is handled before service operations, preventing invalid data from reaching deeper application layers.

---

## Known Limitations

The current version intentionally focuses on the assessment's core inventory-management requirements.

Potential limitations include:

- No password reset workflow
- No email verification
- No pagination for very large inventories
- No vehicle image upload system
- No purchase history
- No inventory audit log
- No refresh-token authentication
- Limited frontend automated testing

These do not prevent the core inventory workflow from functioning.

---

## Future Improvements

Potential production enhancements include:

- Pagination and server-side sorting
- Vehicle image storage
- Purchase history
- Inventory transaction history
- Audit logging for administrator operations
- Email verification
- Password recovery
- Refresh-token authentication
- Rate limiting
- Structured production logging
- Frontend component/integration tests
- CI/CD pipeline
- Containerization with Docker
- Expanded API documentation using OpenAPI/Swagger

---

## AI-Assisted Development

AI assistance was used during development as a productivity and engineering-support tool.

Assistance included areas such as:

- Architecture discussion
- Test-case planning
- TDD workflow guidance
- Debugging
- Code review
- Documentation
- Refactoring suggestions

AI-generated suggestions were not treated as proof of correctness.

Implementation behavior was verified through:

- Automated tests
- Manual API testing
- Application testing
- Database verification
- Developer review

Where required by the assessment, relevant AI-assisted commits can be identified through the repository's Git history and co-author metadata.

---

## Repository Hygiene

The repository should not contain:

```text
.env
node_modules/
coverage/
dist/
```

Before submission, verify that no credentials or secrets are present in Git history.

---

## Final Verification

Before submitting the assessment, verify:

- Backend starts successfully
- Frontend builds successfully
- Registration works
- Login works
- JWT-protected routes work
- User/admin authorization works
- Vehicles can be added
- Vehicles can be edited
- Vehicles can be deleted
- Vehicles can be purchased
- Vehicles can be restocked
- Out-of-stock purchases are rejected
- Search by make/model works
- Category filtering works
- Price filtering works
- Automated tests pass
- Production frontend connects to production backend
- No `.env` files are committed
- No credentials are present in repository history

---

## License

This project was developed as part of a technical assessment. Usage and distribution should follow the requirements of the assessment and repository owner.