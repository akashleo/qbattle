

# Backend Ticket 006 - Current User API

## Epic

Authentication

---

## Goal

Implement an endpoint to fetch the currently authenticated user's profile.

---

## Dependencies

* ✅ Backend Ticket 005

---

## Tasks

* Implement:

```http
GET /api/auth/me
```

* Protect the route using the JWT middleware.
* Fetch the user from the database using `req.user.id`.
* Return the user's profile (excluding sensitive fields).

---

## Success Response

**200 OK**

```json
{
  "id": "...",
  "username": "akash",
  "email": "akash@example.com",
  "role": "user",
  "avatar_url": null
}
```

---

## Error Cases

* Unauthorized → `401`
* User not found → `404`

---

## Acceptance Criteria

* Only authenticated users can access the endpoint.
* `password_hash` is never returned.
* Response contains the latest user data from the database.

---

## Definition of Done

* `GET /api/auth/me` is working.
* Endpoint is tested with valid and invalid JWTs.
