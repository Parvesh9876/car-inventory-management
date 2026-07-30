# AI-Assisted Development Log

## Purpose

This document records the use of AI-assisted development during the implementation of the **Car Inventory Management System**.

AI was used as an engineering support tool for planning, test design, debugging, implementation suggestions, refactoring, and documentation.

All generated suggestions were reviewed, integrated, modified where necessary, and validated through automated tests and manual verification.

---

## Development Approach

The project followed an iterative engineering workflow:

```text
Requirement Analysis
        ↓
Architecture Planning
        ↓
Test / Expected Behaviour
        ↓
Implementation
        ↓
Automated & Manual Verification
        ↓
Refactoring
        ↓
Git Commit
```

For critical backend functionality, this workflow incorporated the **Red → Green → Refactor** Test-Driven Development cycle.

---

# Prompt Log

## 1. Project Architecture

### Prompt

> Design a maintainable full-stack architecture for a Car Inventory Management System using React, Node.js, Express.js, and MongoDB.
>
> The application should support authentication, role-based authorization, vehicle CRUD operations, purchasing, restocking, search, filtering, and automated backend testing.
>
> Keep controllers, services, routes, middleware, models, validators, and tests separated. Add useful comments explaining important implementation decisions.

### Outcome

The backend was organized using a layered architecture:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

The frontend was organized around reusable components, API modules, authentication context, and pages.

---

## 2. Authentication Design

### Prompt

> Implement secure authentication for the inventory application using JWT and password hashing.
>
> Registration should validate input, prevent duplicate email addresses, hash passwords before persistence, and return an authentication token.
>
> Login should verify the user's credentials and return a JWT containing the information required for authorization.
>
> Keep authentication business logic inside the service layer.

### Outcome

Authentication was implemented with:

- User registration
- Password hashing
- Duplicate-email detection
- User login
- JWT generation
- Authentication middleware
- Role information for authorization

---

## 3. Registration — TDD Cycle

### Prompt

> Develop user registration using Test-Driven Development.
>
> Start by defining tests for successful registration and database persistence.
>
> Then implement only enough functionality to make the tests pass before refactoring the implementation.

### Red

Initial tests described expected registration behavior before the complete persistence logic existed.

### Green

Registration functionality was implemented to persist the user and return the expected response.

### Refactor

Registration responsibilities were separated into controller, service, model, validation, and token-generation layers.

---

## 4. Password Security

### Prompt

> Add a test proving that registration does not store the user's original plain-text password.
>
> Implement password hashing and verify the persisted password differs from the submitted password.

### Outcome

Password hashing was added and verified through automated testing.

---

## 5. Duplicate Registration

### Prompt

> Add duplicate-email protection to registration.
>
> Attempting to register an email that already exists should return an appropriate conflict response instead of creating another user.

### Outcome

Duplicate registration was handled using a `409 Conflict` response.

---

## 6. JWT Generation

### Prompt

> Generate a JWT after successful authentication.
>
> Keep token generation in a reusable utility rather than directly inside controllers.
>
> Include the user identifier and role required by protected endpoints.

### Outcome

A dedicated JWT generation utility was introduced and used by the authentication flow.

---

## 7. Login

### Prompt

> Implement the login flow after registration is complete.
>
> Validate email and password, retrieve the user, compare the submitted password with the stored hash, reject invalid credentials consistently, and return a JWT for valid credentials.

### Outcome

Login functionality was implemented and tested for both successful and unsuccessful authentication attempts.

---

## 8. Authentication Middleware

### Prompt

> Create Express authentication middleware that reads the JWT from the request, verifies it, identifies the authenticated user, and makes the user available to downstream middleware/controllers.
>
> Reject missing or invalid tokens with an appropriate authentication response.

### Outcome

Protected vehicle operations were secured using JWT authentication middleware.

---

## 9. Role-Based Authorization

### Prompt

> Implement administrator authorization separately from authentication.
>
> Authenticated normal users should be able to access standard inventory functionality, while inventory-management operations such as creating, editing, deleting, and restocking vehicles must require the administrator role.
>
> Do not rely on frontend button visibility for security.

### Outcome

Administrator middleware was added to enforce backend RBAC.

---

## 10. Vehicle Model and CRUD

### Prompt

> Design the Vehicle model and implement inventory CRUD operations.
>
> A vehicle should contain make, model, category, price, and quantity.
>
> Validate prices and inventory quantities so invalid values cannot be persisted.
>
> Keep database operations in the vehicle service layer.

### Outcome

Vehicle CRUD operations were implemented with Mongoose validation and administrator authorization where required.

---

## 11. Vehicle Purchase

### Prompt

> Implement a purchase operation that decreases vehicle inventory by exactly one.
>
> The operation must never allow quantity to become negative.
>
> Prefer an atomic MongoDB operation rather than reading the quantity, changing it in JavaScript, and saving it later.
>
> Return separate errors when the vehicle does not exist and when it is out of stock.

### Outcome

Purchasing was implemented using an atomic conditional update:

```text
Vehicle exists AND quantity > 0
              ↓
         quantity - 1
```

This protects the core stock constraint.

---

## 12. Vehicle Restocking

### Prompt

> Implement administrator-only vehicle restocking.
>
> The endpoint should accept a positive quantity and atomically increase the existing stock.
>
> Normal authenticated users must receive a forbidden response.

### Outcome

Restocking was implemented using MongoDB's atomic `$inc` operation and protected with administrator middleware.

---

## 13. Search and Filtering

### Prompt

> Implement vehicle search and filtering.
>
> A general search field should match either vehicle make or model using case-insensitive partial matching.
>
> Also support category, minimum price, and maximum price filters.
>
> Filters should work individually and in combination.

### Outcome

The search query supports:

```text
(make OR model)
       AND
category
       AND
price range
```

Supported parameters include:

```text
search
make
model
category
minPrice
maxPrice
```

---

## 14. Request Validation

### Prompt

> Add request validation for authentication and vehicle APIs using express-validator.
>
> Validate required vehicle fields, non-negative prices, non-negative inventory, positive restock quantities, and valid search price ranges.
>
> Keep validation definitions separate from controllers.

### Outcome

Dedicated authentication and vehicle validators were introduced.

---

## 15. Centralized Error Handling

### Prompt

> Implement centralized Express error handling so controllers and services do not duplicate response-building logic for every failure.
>
> Preserve useful HTTP status codes for validation, authentication, authorization, missing resources, conflicts, and business-rule failures.

### Outcome

Application errors are passed to centralized error-handling middleware for consistent API responses.

---

## 16. Backend Test Environment

### Prompt

> Configure Jest and Supertest for API testing.
>
> Tests must not operate against production application data.
>
> Use a dedicated MongoDB test database, clear test data between tests, and close the Mongoose connection when the suite finishes.

### Outcome

A dedicated test configuration was established with database cleanup and connection lifecycle management.

---

## 17. Debugging MongoDB Test Connectivity

### Prompt

> Diagnose Jest hooks timing out while connecting to MongoDB Atlas.
> Determine whether the problem is related to Jest timeout configuration, MongoDB connectivity, environment variables, or Atlas network access.
>
> Avoid hiding genuine connection errors by only increasing the timeout.

### Outcome

The database configuration and test setup were corrected and the backend test suite was restored.

---

## 18. React Frontend Architecture

### Prompt

> Build a maintainable React/Vite frontend for the inventory system.
>
> Separate API communication, authentication state, pages, reusable components, and administrator components.
>
> Use a responsive professional dashboard design and connect it to the existing REST API.

### Outcome

The frontend was structured using:

```text
src/
├── api/
├── assets/
├── components/
├── context/
├── pages/
├── App.jsx
└── main.jsx
```

---

## 19. Authentication Context

### Prompt

> Create a React authentication context that maintains authenticated user state and provides login/logout information throughout the application.
>
> The UI should be able to determine whether the current user is an administrator.

### Outcome

Authentication state and role information became available to protected pages and components through React context.

---

## 20. Inventory Dashboard

### Prompt

> Create the main vehicle inventory dashboard.
>
> Load vehicles from the backend, display loading and API error states, render inventory cards, and expose administrator management actions only when appropriate.
>
> Refresh inventory after operations that change stock.

### Outcome

The dashboard became the central interface for inventory browsing and management.

---

## 21. Administrator Modals

### Prompt

> Add reusable modal workflows for administrator operations:
>
> - Add Vehicle
> - Edit Vehicle
> - Restock Vehicle
>
> Forms should call the corresponding backend API and refresh inventory after successful operations.

### Outcome

Administrator inventory management was integrated into the dashboard without requiring separate pages for each operation.

---

## 22. Search UI Integration

### Prompt

> Connect the dashboard search/filter component to the backend search endpoint.
>
> Send the general text field using the `search` parameter so the backend can search make OR model.
>
> Support category, minimum price, maximum price, search, and reset actions.
>
> Prevent a minimum price greater than the maximum price from being submitted.

### Outcome

Frontend and backend filtering contracts were aligned.

---

## 23. Deployment Configuration

### Prompt

> Prepare the React/Vite frontend for Netlify deployment in a repository containing separate `frontend` and `backend` directories.
>
> Determine the correct base directory, build command, publish directory, production API environment variable, and React Router SPA fallback configuration.

### Outcome

Netlify configuration:

```text
Base directory:    frontend
Build command:     npm run build
Publish directory: dist
```

The frontend uses a production `VITE_API_URL` environment variable to communicate with the deployed backend.

---

## 24. Professional Documentation

### Prompt

> Prepare professional engineering documentation for the technical assessment.
>
> Document the architecture, features, role model, API, business rules, security, testing strategy, TDD process, environment configuration, local setup, deployment, engineering decisions, limitations, and AI-assisted development.
>
> Do not include credentials or secrets.

### Outcome

A comprehensive project `README.md` and this AI-assistance log were prepared.

---

# Validation of AI-Assisted Work

AI suggestions were treated as implementation proposals rather than automatically accepted output.

Changes were validated through combinations of:

### Automated Testing

Backend behavior was checked with Jest and Supertest.

At one development checkpoint:

```text
Test Suites: 5 passed
Tests:       25 passed
```

### Manual Testing

The application was manually exercised for workflows including:

- Registration
- Login
- Vehicle browsing
- Search
- Filtering
- Purchasing
- Adding vehicles
- Editing vehicles
- Deleting vehicles
- Restocking
- Administrator authorization

### Database Verification

MongoDB persistence was verified during development for operations where database state was important.

### Developer Review

Generated code and suggestions were reviewed and adjusted before being retained in the repository.

---

# AI Usage Principles

AI assistance was primarily used to accelerate:

- Requirement interpretation
- Architecture planning
- Test design
- Boilerplate implementation
- Debugging
- Refactoring
- Documentation

The following remained developer responsibilities:

- Selecting the implementation approach
- Running commands
- Reviewing generated code
- Investigating failures
- Validating API behavior
- Verifying database state
- Accepting or rejecting changes
- Managing Git history
- Configuring deployment
- Final submission verification

---

# Security and Privacy

No production credentials should be included in prompts, documentation, screenshots, commits, or repository files.

Sensitive configuration must remain in environment variables, including:

```text
MongoDB credentials
JWT secrets
Deployment secrets
Private API credentials
```

Any credential accidentally exposed during development should be rotated before deployment.

---

# Summary

AI assistance supported the engineering workflow, but correctness was determined through tests, runtime behavior, database verification, manual review, and developer decisions.

The resulting application combines AI-assisted productivity with conventional software engineering practices including:

- Layered architecture
- RESTful APIs
- Test-Driven Development
- Automated testing
- Input validation
- Authentication
- Role-based authorization
- Atomic database operations
- Git-based version control