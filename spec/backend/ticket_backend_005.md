# Backend Ticket 005 - JWT Authentication Middleware

## Epic

Authentication

---

## Goal

Create middleware to protect authenticated routes.

---

## Dependencies

* ✅ Backend Ticket 004

---

## Tasks

* Create `auth.middleware.js`.
* Read the JWT from the `Authorization` header.
* Validate the `Bearer <token>` format.
* Verify the JWT.
* Attach the decoded user to `req.user`.
* Reject invalid or expired tokens.

---

## Protected Header

```http
Authorization: Bearer <jwt_token>
```

---

## Success

The request proceeds to the next middleware, and `req.user` is available.

Example:

```js
req.user = {
  id: "...",
  username: "akash",
  role: "user"
}
```

---

## Error Cases

* Missing token → `401`
* Invalid token → `401`
* Expired token → `401`

---

## Acceptance Criteria

* Valid JWT allows access.
* Invalid or expired JWT is rejected.
* `req.user` is available in protected routes.

---

## Definition of Done

* Authentication middleware is reusable across the application.
* Tested with at least one protected route (e.g. `GET /api/auth/me`).
