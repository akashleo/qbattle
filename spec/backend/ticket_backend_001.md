# Backend Ticket 001 - Initialize Express Backend

## Epic

Backend Foundation

---

## Goal

Set up the backend project with a clean, scalable architecture that will serve as the foundation for the quiz application.

At the end of this ticket, the application should be able to start successfully and expose a health check endpoint.

No database, authentication, or business logic should be implemented yet.

---

## Description

Create a new Express application using modern JavaScript (ES Modules preferred).

Configure the project for development with environment variables, request logging, CORS support, and JSON parsing.

Organize the project using a feature-oriented structure so that future tickets can be added without major refactoring.

---

## Tech Stack

* Node.js
* Express
* dotenv
* cors
* morgan
* nodemon

---

## Required Folder Structure

```text
server
│
├── src
│   ├── app.js
│   ├── server.js
│   │
│   ├── config
│   ├── constants
│   ├── middleware
│   ├── modules
│   ├── routes
│   ├── services
│   ├── sockets
│   └── utils
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Tasks

### 1. Initialize Project

* Create a new Node project.
* Configure ES Modules.
* Install required dependencies.

Development dependencies:

* nodemon

Dependencies:

* express
* dotenv
* cors
* morgan

---

### 2. Configure Environment Variables

Create a `.env` file.

Add placeholders for future configuration.

Example:

```text
PORT=5000

CLIENT_URL=http://localhost:5173

JWT_SECRET=

SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

Do **not** implement Supabase in this ticket.

---

### 3. Create Express Application

Configure:

* Express instance
* JSON middleware
* CORS
* Morgan logger

---

### 4. Create Server Entry

Create a dedicated `server.js`.

Responsibilities:

* Load environment variables
* Start Express server
* Listen on configured port
* Log successful startup

---

### 5. Health Check Endpoint

Create

```http
GET /health
```

Response

```json
{
  "status": "ok"
}
```

Status Code

```text
200 OK
```

---

## Acceptance Criteria

* Project starts successfully using

```bash
npm run dev
```

* Health endpoint returns

```json
{
  "status": "ok"
}
```

* Environment variables are loaded correctly.

* CORS is enabled.

* Morgan logs incoming requests.

* JSON request bodies are parsed.

* Folder structure matches the specification.

* No database integration.

* No authentication.

* No Socket.IO implementation.

---

## Out of Scope

The following will be implemented in future tickets:

* Supabase
* JWT
* Authentication
* User Management
* Quiz APIs
* Challenge APIs
* Socket Server

---

## Deliverables

* Initialized backend project
* Clean folder structure
* Express server
* Health endpoint
* Development environment configured

---

## Definition of Done

* Server starts without errors.
* Folder structure is complete.
* `GET /health` responds successfully.
* Code is committed with a meaningful commit message.
* Ready to begin Ticket Backend 002.
