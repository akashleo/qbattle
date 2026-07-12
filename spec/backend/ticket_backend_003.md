

# Backend Ticket 003 - User Registration API

## Epic

Authentication

---

## Goal

Implement the user registration endpoint.

---

## Dependencies

* ✅ Backend Ticket 001
* ✅ Backend Ticket 002

---

## Tasks

* Install `bcrypt`.
* Create an `auth` module.
* Implement:

```http
POST /api/auth/register
```

* Validate:

  * username
  * email
  * password
* Check if email already exists.
* Hash the password using bcrypt.
* Insert the user into the `users` table.
* Default role should be `user`.
* Return a success response (do **not** generate a JWT yet).

---

## Request

```json
{
  "username": "akash",
  "email": "akash@example.com",
  "password": "password123"
}
```

---

## Success Response

**201 Created**

```json
{
  "message": "User registered successfully"
}
```

---

## Error Cases

* Missing required fields → `400`
* Email already exists → `409`
* Internal server error → `500`

---

## Acceptance Criteria

* Password is stored as a bcrypt hash.
* Duplicate emails are rejected.
* User is successfully inserted into Supabase.
* Plain-text passwords are never stored.

---

## Definition of Done

* `POST /api/auth/register` is working.
* Registration is fully tested with Postman or Bruno.
* Code is committed.

