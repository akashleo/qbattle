# Backend Ticket 004 - User Login API

## Epic

Authentication

---

## Goal

Implement the user login endpoint.

---

## Dependencies

* ✅ Backend Ticket 003

---

## Tasks

* Install `jsonwebtoken`.
* Implement:

```http
POST /api/auth/login
```

* Validate:

  * email
  * password
* Find the user by email.
* Compare the password using bcrypt.
* Generate a JWT containing:

  * user id
  * username
  * role
* Return the token and basic user information.

---

## Request

```json
{
  "email": "akash@example.com",
  "password": "password123"
}
```

---

## Success Response

**200 OK**

```json
{
  "token": "<jwt_token>",
  "user": {
    "id": "...",
    "username": "akash",
    "email": "akash@example.com",
    "role": "user"
  }
}
```

---

## Error Cases

* Invalid email/password → `401`
* Missing fields → `400`
* Internal server error → `500`

---

## Acceptance Criteria

* Valid credentials return a JWT.
* Invalid credentials return `401`.
* JWT expires in a configurable duration (via `.env`).
* Sensitive fields (e.g. `password_hash`) are never returned.

---

## Definition of Done

* `POST /api/auth/login` works correctly.
* JWT is signed using the configured secret.
* Login is tested successfully.

