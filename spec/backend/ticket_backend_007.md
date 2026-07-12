# ticket_backend_007.md

# Backend Ticket 007 - Role-Based Authorization Middleware

## Epic

Authentication

---

## Goal

Implement reusable middleware to restrict routes based on user roles.

---

## Dependencies

* ✅ Backend Ticket 005

---

## Tasks

* Create `authorize.middleware.js`.
* Accept one or more allowed roles.
* Check `req.user.role`.
* Allow the request if the user's role is permitted.
* Return `403 Forbidden` otherwise.

Example:

```js
router.post(
  "/quizzes",
  authenticate,
  authorize("admin"),
  createQuiz
);
```

---

## Error Cases

* User role not permitted → `403`

---

## Acceptance Criteria

* Middleware supports one or multiple roles.

Example:

```js
authorize("admin")

authorize("admin", "moderator")
```

* Middleware is reusable across all protected routes.

---

## Definition of Done

* Authorization middleware is implemented.
* Tested using both `admin` and `user` accounts.
* Ready to secure future admin endpoints.
