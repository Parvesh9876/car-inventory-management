# Car Inventory Management System

## Technical Documentation

> A full-stack Car Dealership Inventory Management System built using the MERN stack with JWT authentication, role-based authorization, inventory management, search/filtering, purchasing, restocking, and automated backend testing.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Features](#4-features)
5. [User Roles](#5-user-roles)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
8. [Backend Architecture](#8-backend-architecture)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Database Design](#10-database-design)
11. [Authentication](#11-authentication)
12. [Authorization](#12-authorization)
13. [Vehicle Inventory Management](#13-vehicle-inventory-management)
14. [Search and Filtering](#14-search-and-filtering)
15. [Purchase Workflow](#15-purchase-workflow)
16. [Restock Workflow](#16-restock-workflow)
17. [API Documentation](#17-api-documentation)
18. [Validation](#18-validation)
19. [Error Handling](#19-error-handling)
20. [Testing Strategy](#20-testing-strategy)
21. [Test-Driven Development](#21-test-driven-development)
22. [Security](#22-security)
23. [Environment Configuration](#23-environment-configuration)
24. [Local Development](#24-local-development)
25. [Deployment](#25-deployment)
26. [Live Application](#26-live-application)
27. [Demo Credentials](#27-demo-credentials)
28. [Engineering Decisions](#28-engineering-decisions)
29. [Challenges and Solutions](#29-challenges-and-solutions)
30. [Future Improvements](#30-future-improvements)
31. [Conclusion](#31-conclusion)

---

# 1. Project Overview

The **Car Inventory Management System** is a full-stack web application designed to manage the inventory of a car dealership.

The system provides two primary user roles:

- **Administrator**
- **Customer / Normal User**

Customers can browse available vehicles, search and filter inventory, and purchase vehicles.

Administrators have additional inventory-management capabilities such as adding vehicles, editing vehicle information, deleting vehicles, and restocking inventory.

The application uses a React frontend connected to a Node.js/Express REST API, with MongoDB used for persistent data storage.

---

# 2. Problem Statement

Car dealerships need an efficient way to maintain vehicle inventory while allowing customers to browse currently available vehicles.

The system must ensure that:

- Vehicle inventory is centrally maintained.
- Customers can view available vehicles.
- Customers can search and filter inventory.
- Customers can purchase available vehicles.
- Vehicle stock cannot become negative.
- Administrators can manage dealership inventory.
- Normal users cannot perform administrative operations.
- User credentials are securely stored.
- Protected operations require authentication.

The Car Inventory Management System provides these capabilities through a REST-based full-stack architecture.

---

# 3. Project Objectives

The primary objectives of the application are:

- Build a maintainable full-stack inventory application.
- Implement secure authentication.
- Implement role-based authorization.
- Provide complete vehicle inventory management.
- Prevent invalid inventory operations.
- Support vehicle purchasing.
- Support inventory restocking.
- Provide vehicle search and filtering.
- Validate API input.
- Provide consistent error handling.
- Use automated testing for critical backend functionality.
- Apply Test-Driven Development where appropriate.
- Deploy the application for online demonstration.

---

# 4. Features

## Authentication

- User registration
- User login
- Password hashing
- JWT-based authentication
- Persistent authentication
- Protected routes

## Vehicle Inventory

- View vehicles
- Add vehicles
- Edit vehicles
- Delete vehicles
- Search vehicles
- Filter vehicles
- Purchase vehicles
- Restock vehicles

## Administrator Features

Administrators can:

- Add new vehicles
- Edit existing vehicles
- Delete vehicles
- Restock inventory
- Browse inventory
- Search inventory
- Purchase vehicles

## Customer Features

Customers can:

- Register an account
- Login
- Browse vehicles
- Search vehicles
- Filter vehicles
- View stock
- Purchase vehicles

Customers cannot modify dealership inventory.

---

# 5. User Roles

The application uses Role-Based Access Control (RBAC).

## Administrator

```text
ADMIN
 │
 ├── View Vehicles
 ├── Search Vehicles
 ├── Purchase Vehicle
 ├── Add Vehicle
 ├── Edit Vehicle
 ├── Delete Vehicle
 └── Restock Vehicle
```

## Normal User

```text
USER
 │
 ├── View Vehicles
 ├── Search Vehicles
 └── Purchase Vehicle
```

Administrative functionality is protected on the backend.

Hiding administrator buttons in the frontend is only a user-interface decision and is **not considered a security mechanism**.

---

# 6. Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| Axios | HTTP communication |
| React Router | Client-side routing |
| Lucide React | Icons |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| express-validator | Request validation |
| CORS | Cross-origin configuration |
| Helmet | HTTP security headers |
| Morgan | HTTP request logging |

## Database

| Technology | Purpose |
|---|---|
| MongoDB | Database |
| MongoDB Atlas | Cloud database hosting |
| Mongoose | Schema/model layer |

## Testing

| Technology | Purpose |
|---|---|
| Jest | Test framework |
| Supertest | HTTP API testing |

---

# 7. System Architecture

The project follows a client-server architecture.

```text
┌───────────────────────────────┐
│             User              │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        React Frontend         │
│                               │
│ Login                         │
│ Register                      │
│ Dashboard                     │
│ Search / Filters              │
│ Admin Management              │
└───────────────┬───────────────┘
                │
                │ HTTP / JSON
                │ JWT
                ▼
┌───────────────────────────────┐
│         Express REST API      │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Middleware           │
│                               │
│ Authentication                │
│ Authorization                 │
│ Validation                    │
│ Error Handling                │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Controllers          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│           Services            │
│        Business Logic         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        Mongoose Models        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         MongoDB Atlas         │
└───────────────────────────────┘
```

---

# 8. Backend Architecture

The backend uses a layered architecture.

```text
Request
   │
   ▼
Route
   │
   ▼
Middleware / Validation
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

## Routes

Routes define available API endpoints and connect them with middleware and controllers.

Example:

```text
POST /api/auth/register
POST /api/auth/login

GET    /api/vehicles
GET    /api/vehicles/search
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id

POST /api/vehicles/:id/purchase
POST /api/vehicles/:id/restock
```

## Controllers

Controllers handle HTTP-level responsibilities.

They:

- Read request data
- Call services
- Return HTTP responses
- Pass errors to error middleware

Controllers should contain minimal business logic.

## Services

Services contain the main business logic.

Examples include:

- Registering users
- Authenticating users
- Creating vehicles
- Updating vehicles
- Searching vehicles
- Purchasing vehicles
- Restocking inventory

## Models

Mongoose models define how application data is represented and persisted in MongoDB.

## Middleware

Middleware handles reusable request-processing concerns such as:

- Authentication
- Administrator authorization
- Validation
- Error handling

---

# 9. Frontend Architecture

The frontend is built using React.

A simplified structure is:

```text
frontend/
│
├── src/
│   │
│   ├── api/
│   │   ├── auth.api.js
│   │   └── vehicle.api.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── VehicleGrid.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── SearchFilters.jsx
│   │   ├── LoadingSpinner.jsx
│   │   │
│   │   └── admin/
│   │       ├── VehicleForm.jsx
│   │       ├── EditVehicleModal.jsx
│   │       └── RestockModal.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

The Dashboard is responsible for coordinating the main inventory UI.

It maintains:

- Vehicle data
- Loading state
- API errors
- Search filters
- Add Vehicle modal state
- Selected vehicle for editing
- Selected vehicle for restocking

Inventory is refreshed after operations that modify database state so the frontend remains synchronized with the backend.

---

# 10. Database Design

The application primarily works with two entities:

```text
┌───────────────────┐
│       User        │
├───────────────────┤
│ _id               │
│ name              │
│ email             │
│ password          │
│ role              │
│ timestamps        │
└───────────────────┘


┌───────────────────┐
│      Vehicle      │
├───────────────────┤
│ _id               │
│ make              │
│ model             │
│ category          │
│ price             │
│ quantity          │
│ timestamps        │
└───────────────────┘
```

## User

The User model stores authentication and authorization information.

Important properties include:

- Name
- Email
- Password hash
- Role

Passwords are not intended to be stored in plain text.

## Vehicle

The Vehicle model represents inventory.

Important properties include:

- Make
- Model
- Category
- Price
- Quantity

Vehicle quantity represents the number of units currently available.

---

# 11. Authentication

The application uses JWT-based authentication.

## Registration Flow

```text
User
 │
 │ name/email/password
 ▼
Register Endpoint
 │
 ▼
Validation
 │
 ▼
Check Existing Email
 │
 ├──── Exists ────► 409 Conflict
 │
 ▼
Hash Password
 │
 ▼
Create User
 │
 ▼
Generate JWT
 │
 ▼
Return User + Token
```

Passwords are hashed before persistence.

---

## Login Flow

```text
Email + Password
       │
       ▼
Validate Request
       │
       ▼
Find User
       │
       ▼
Compare Password
       │
   ┌───┴────┐
   │        │
Invalid    Valid
   │        │
  401       ▼
        Generate JWT
             │
             ▼
        Return Token
```

Invalid credentials return an authentication error without exposing whether the email or password specifically caused the failure.

---

# 12. Authorization

Authentication answers:

> **Who is making this request?**

Authorization answers:

> **Is this user allowed to perform this operation?**

Administrator-only operations are protected using role-based middleware.

For example:

```text
Request
   │
   ▼
Authentication Middleware
   │
   ▼
JWT Valid?
   │
   ├── No ─────► 401
   │
   ▼
Authenticated User
   │
   ▼
Admin Middleware
   │
   ▼
role === admin?
   │
   ├── No ─────► 403
   │
   ▼
Controller
```

---

# 13. Vehicle Inventory Management

The application supports complete inventory management.

## Create Vehicle

Administrator-only operation.

Required information includes:

```json
{
  "make": "Toyota",
  "model": "Fortuner",
  "category": "SUV",
  "price": 45000,
  "quantity": 5
}
```

---

## View Vehicles

Authenticated users can retrieve available inventory.

```http
GET /api/vehicles
```

The dashboard loads vehicle inventory when the page opens and refreshes it after inventory-changing operations.

---

## Update Vehicle

Administrators can modify existing vehicle information.

```http
PUT /api/vehicles/:id
```

Fields can be updated without replacing the entire vehicle.

---

## Delete Vehicle

Administrators can remove vehicles.

```http
DELETE /api/vehicles/:id
```

The frontend asks for confirmation before deletion.

---

# 14. Search and Filtering

The inventory supports multiple filtering options.

Users can filter using:

- Search text
- Category
- Minimum price
- Maximum price

Example:

```http
GET /api/vehicles/search?search=Toyota&category=SUV&minPrice=20000&maxPrice=50000
```

The general `search` parameter can be used for make/model matching.

Filters can also be combined.

```text
Search: Toyota
       AND
Category: SUV
       AND
Price >= Minimum
       AND
Price <= Maximum
```

The frontend also prevents an invalid range where:

```text
minimum price > maximum price
```

---

# 15. Purchase Workflow

Purchasing reduces inventory by one.

```http
POST /api/vehicles/:id/purchase
```

## Business Rule

```text
quantity > 0
```

must be true before a purchase succeeds.

Conceptually:

```text
Current quantity = 5

Purchase
   │
   ▼

New quantity = 4
```

The backend uses an atomic database update for the stock modification.

This is safer than:

```text
Read quantity
     ↓
Change in JavaScript
     ↓
Save later
```

because concurrent requests could otherwise operate on outdated inventory values.

## Out of Stock

If:

```text
quantity = 0
```

the purchase is rejected.

The quantity must never become negative.

---

# 16. Restock Workflow

Restocking is an administrator-only operation.

```http
POST /api/vehicles/:id/restock
```

Example request:

```json
{
  "quantity": 5
}
```

If current inventory is:

```text
quantity = 3
```

after restocking:

```text
3 + 5 = 8
```

The operation uses MongoDB's `$inc` functionality to increase inventory atomically.

Restock quantity must be at least `1`.

---

# 17. API Documentation

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Example:

```json
{
  "name": "Demo User",
  "email": "user@example.com",
  "password": "password123"
}
```

Possible responses:

| Status | Meaning |
|---|---|
| `201` | User registered |
| `400` | Validation error |
| `409` | Email already registered |

---

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Possible responses:

| Status | Meaning |
|---|---|
| `200` | Login successful |
| `400` | Validation error |
| `401` | Invalid credentials |

---

## Vehicle APIs

### Get Vehicles

```http
GET /api/vehicles
```

---

### Search Vehicles

```http
GET /api/vehicles/search
```

Query parameters:

| Parameter | Purpose |
|---|---|
| `search` | Search make/model |
| `category` | Filter category |
| `minPrice` | Minimum price |
| `maxPrice` | Maximum price |

---

### Create Vehicle

```http
POST /api/vehicles
```

**Authorization:** Admin

---

### Update Vehicle

```http
PUT /api/vehicles/:id
```

**Authorization:** Admin

---

### Delete Vehicle

```http
DELETE /api/vehicles/:id
```

**Authorization:** Admin

---

### Purchase Vehicle

```http
POST /api/vehicles/:id/purchase
```

**Authorization:** Authenticated user

---

### Restock Vehicle

```http
POST /api/vehicles/:id/restock
```

**Authorization:** Admin

Example:

```json
{
  "quantity": 10
}
```

---

# 18. Validation

API request validation is handled separately from business logic.

Examples include:

## Vehicle Creation

```text
make       → required
model      → required
category   → required
price      → number >= 0
quantity   → integer >= 0
```

## Vehicle Update

Fields are optional, but provided values must still satisfy their constraints.

## Restocking

```text
quantity >= 1
```

## Search

```text
minPrice >= 0
maxPrice >= 0
```

Separating validation from controllers keeps controllers smaller and easier to maintain.

---

# 19. Error Handling

The backend uses centralized error handling.

Instead of every controller implementing separate error-response logic:

```text
Service
   │
   │ throws error
   ▼
Controller
   │
   │ next(error)
   ▼
Error Middleware
   │
   ▼
HTTP Response
```

Common status codes include:

| Status | Meaning |
|---|---|
| `200` | Successful operation |
| `201` | Resource created |
| `400` | Invalid request/business rule |
| `401` | Authentication required/invalid credentials |
| `403` | Insufficient permission |
| `404` | Resource not found |
| `409` | Resource conflict |
| `500` | Unexpected server error |

---

# 20. Testing Strategy

Backend testing uses:

- Jest
- Supertest
- Dedicated test database

Tests verify both HTTP behavior and important database effects.

Test areas include:

### Registration

- Successful registration
- User persistence
- Password hashing
- Duplicate email
- JWT generation

### Login

- Successful login
- Invalid password
- Invalid email
- Request validation

### Purchasing

- Successful purchase
- Quantity decreases
- Out-of-stock behavior
- Vehicle-not-found behavior

### Restocking

- Successful administrator restock
- Inventory increase
- Normal user authorization failure

At a completed development checkpoint:

```text
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
```

---

# 21. Test-Driven Development

Critical backend functionality was developed using the:

```text
RED → GREEN → REFACTOR
```

cycle.

## RED

Write a test describing expected behavior.

```text
Expected behavior
      │
      ▼
Run test
      │
      ▼
Test fails ❌
```

The failure demonstrates that the required behavior has not yet been implemented.

## GREEN

Implement the minimum correct functionality.

```text
Failing Test
     │
     ▼
Implementation
     │
     ▼
Run Tests
     │
     ▼
Tests Pass ✅
```

## REFACTOR

Improve the implementation while preserving behavior.

```text
Passing implementation
        │
        ▼
Improve structure
        │
        ▼
Run tests again
        │
        ▼
Still passing ✅
```

This approach was particularly useful for authentication and inventory business rules.

---

# 22. Security

The project implements several security measures.

## Password Hashing

Passwords are hashed before database persistence.

## JWT Authentication

Protected APIs require valid authentication.

## Role-Based Authorization

Administrative endpoints verify the user's role on the backend.

## Helmet

Helmet provides additional HTTP security headers.

## Input Validation

Incoming API data is validated before business logic executes.

## CORS

Cross-origin access is configured for communication between the deployed frontend and backend.

## Environment Variables

Sensitive values are stored outside the source code.

Examples:

```text
MONGODB_URI
MONGODB_TEST_URI
JWT_SECRET
```

`.env` files should never be committed to Git.

---

# 23. Environment Configuration

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_TEST_URI=your_test_database_connection_string
JWT_SECRET=your_secure_jwt_secret
```

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=your_backend_api_url
```

Do not commit real secrets.

Provide `.env.example` files instead.

---

# 24. Local Development

## Clone Repository

```bash
git clone <repository-url>
cd car-inventory-management
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create the backend `.env` file.

Then run:

```bash
npm run dev
```

The backend development server will start.

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create the frontend `.env`.

Then run:

```bash
npm run dev
```

Open the URL shown by Vite in the terminal.

---

## Run Backend Tests

```bash
cd backend
npm test
```

---

# 25. Deployment

The application is deployed using separate cloud services for the frontend, backend, and database.

## Deployment Architecture

```text
                 User / Browser
                       │
                       │ HTTPS
                       ▼
              ┌─────────────────┐
              │     Netlify     │
              │                 │
              │ React + Vite    │
              │    Frontend     │
              └────────┬────────┘
                       │
                       │ REST API / HTTPS
                       │ JWT Authentication
                       ▼
              ┌─────────────────┐
              │      Render     │
              │                 │
              │ Node.js         │
              │ Express.js      │
              │ Backend API     │
              └────────┬────────┘
                       │
                       │ Mongoose
                       ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              │                 │
              │ Cloud Database  │
              └─────────────────┘
```

---

## Frontend Deployment — Netlify

The React/Vite frontend is deployed on **Netlify**.

### Netlify Build Configuration

```text
Base directory: frontend
Build command:  npm run build
Publish:        dist
```

The production frontend communicates with the deployed Render backend using an environment variable.

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

The actual production backend URL should be configured through the Netlify environment settings rather than hardcoded throughout the frontend source code.

---

## Backend Deployment — Render

The Node.js/Express REST API is deployed on **Render**.

The Render service is responsible for running:

```text
Node.js
   │
   ▼
Express Application
   │
   ├── Authentication APIs
   ├── Vehicle APIs
   ├── Validation
   ├── Authorization
   └── Business Logic
```

### Render Configuration

A typical Render configuration for this project is:

```text
Root Directory: backend
Environment:    Node
Build Command:  npm install
Start Command:  npm start
```

The exact commands should match the scripts defined in `backend/package.json`.

---

## Backend Environment Variables

The deployed backend requires environment variables such as:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
```

Sensitive values are configured through the Render environment settings and should never be committed to the Git repository.

---

## Database Deployment — MongoDB Atlas

MongoDB Atlas provides the cloud-hosted database used by the deployed Render backend.

```text
Render Backend
      │
      │ Mongoose
      ▼
MongoDB Atlas
      │
      ├── Users
      └── Vehicles
```

The MongoDB connection string is provided to the backend using the `MONGODB_URI` environment variable.

---

## Production Request Flow

A typical production request follows this path:

```text
1. User opens application
            │
            ▼
2. Netlify serves React frontend
            │
            ▼
3. React sends API request
            │
            ▼
4. Render receives HTTP request
            │
            ▼
5. Express middleware processes request
            │
            ├── Validation
            ├── JWT Authentication
            └── Role Authorization
            │
            ▼
6. Controller calls Service
            │
            ▼
7. Service communicates with MongoDB Atlas
            │
            ▼
8. MongoDB returns data
            │
            ▼
9. Render returns JSON response
            │
            ▼
10. React updates the UI
```

---

## Production Architecture Summary

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | React + Vite | Netlify |
| Backend | Node.js + Express.js | Render |
| Database | MongoDB | MongoDB Atlas |
| Authentication | JWT | Backend |
| Password Security | bcrypt | Backend |

# 26. Live Application

The deployed frontend is available at:

**Live Project:**

https://cardealership-12.netlify.app

---

# 27. Demo Credentials

## Administrator Account

Use the following demo account to evaluate administrator functionality:

| Field | Value |
|---|---|
| Email | `admin@gmail.com` |
| Password | `password123` |
| Role | Administrator |

The administrator can test:

- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Restock Vehicle
- Search
- Filtering
- Purchasing
- Inventory management

> **Important:** This account is intended only for demonstration/assessment purposes and should not contain sensitive or production data.

---

## Normal User / Customer

A dedicated customer demo account is not required.

To test the customer workflow:

1. Open the application.
2. Select **Register**.
3. Create a new account.
4. The account is assigned the normal user/customer role.
5. Continue using the application as a customer.

Customer permissions include:

```text
✓ Browse Vehicles
✓ Search Vehicles
✓ Filter Vehicles
✓ Purchase Vehicles

✗ Add Vehicles
✗ Edit Vehicles
✗ Delete Vehicles
✗ Restock Vehicles
```

---

# 28. Engineering Decisions

## Layered Backend Architecture

The backend separates:

```text
Routes
Controllers
Services
Models
Middleware
Validators
```

This avoids placing the entire application inside route files and improves maintainability.

---

## Service Layer

Database/business operations are placed in services rather than controllers.

This provides clearer separation between HTTP concerns and application logic.

---

## Atomic Inventory Updates

Purchasing and restocking modify stock using atomic MongoDB operations.

This reduces the risk of inconsistent inventory during concurrent requests.

---

## Separate Authentication and Authorization

Authentication and administrator authorization are treated as separate concerns.

```text
Authentication
     ↓
Who are you?

Authorization
     ↓
What are you allowed to do?
```

---

## Dedicated Test Database

Automated tests should not modify development or production inventory.

A dedicated test database isolates test data from application data.

---

## Reusable React Components

The frontend separates reusable components such as:

```text
VehicleCard
VehicleGrid
SearchFilters
Navbar
LoadingSpinner
VehicleForm
EditVehicleModal
RestockModal
```

This keeps the Dashboard from containing every UI implementation detail.

---

# 29. Challenges and Solutions

## MongoDB Test Connection

### Problem

Jest tests initially experienced database connection timeouts.

### Solution

The test database configuration and connection lifecycle were corrected, including proper setup and cleanup.

---

## User Persistence

### Problem

The initial registration implementation returned the expected API response but did not persist the user.

### Solution

Database persistence was implemented in the authentication service and verified through tests.

---

## Password Security

### Problem

Registration needed to guarantee that plain-text passwords were not stored.

### Solution

Password hashing was implemented and verified through an automated test.

---

## Administrator Restock Authorization

### Problem

Restock tests initially returned:

```text
403 Forbidden
```

when the expected administrator operation should succeed.

### Solution

Authentication/role handling was corrected so administrator requests were properly authorized while normal users continued to receive `403`.

---

## Search Integration

### Problem

The frontend's general search field initially mapped only to vehicle make.

### Solution

The frontend/backend contract was aligned around a general `search` query capable of matching make or model.

---

# 30. Future Improvements

Possible improvements include:

- Vehicle image upload
- Cloud image storage
- Pagination
- Sorting
- Purchase history
- Customer order history
- Administrator analytics
- Inventory alerts
- Low-stock notifications
- Email notifications
- Refresh tokens
- Forgot-password functionality
- Password reset
- API rate limiting
- Swagger/OpenAPI documentation
- Docker support
- CI/CD pipeline
- Expanded frontend testing
- Expanded backend integration testing

---

# 31. Conclusion

The Car Inventory Management System demonstrates a complete full-stack inventory workflow using the MERN stack.

The project includes:

- React frontend
- Node.js and Express backend
- MongoDB persistence
- JWT authentication
- Password hashing
- Role-Based Access Control
- Vehicle CRUD operations
- Search and filtering
- Atomic purchasing
- Atomic restocking
- Request validation
- Centralized error handling
- Automated API testing
- Test-Driven Development practices
- Cloud deployment

The architecture separates application responsibilities into clear layers, making the project easier to understand, test, maintain, and extend.

---

## Additional Documentation

Additional repository documentation can include:

```text
README.md                 → Project introduction and quick start
PROMPTS.md                → AI-assisted development log
docs/
└── PROJECT_DOCUMENTATION.md → Detailed technical documentation
```

---

## Project Links

**Live Application:**  
https://cardealership-12.netlify.app


---

## Author

**Parvesh Kumar**

Car Inventory Management System  
Technical Assessment Project