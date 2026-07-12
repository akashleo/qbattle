# ticket_backend_008.md

# Backend Ticket 008 - Create Quiz API

## Epic

Quiz Management

---

## Goal

Implement an API for admins to create a new quiz.

---

## Dependencies

* ✅ Backend Ticket 007

---

## Tasks

* Implement:

```http
POST /api/quizzes
```

* Protect the route using:

  * `authenticate`
  * `authorize("admin")`
* Validate:

  * title
  * description
  * duration_seconds
* Insert a new record into the `quizzes` table.
* Set:

  * `created_by` from `req.user.id`
  * `is_active = true`

---

## Request

```json
{
  "title": "JavaScript Basics",
  "description": "15 beginner JavaScript questions",
  "duration_seconds": 120
}
```

---

## Success Response

**201 Created**

```json
{
  "message": "Quiz created successfully",
  "quizId": "<uuid>"
}
```

---

## Error Cases

* Missing required fields → `400`
* Unauthorized → `401`
* Forbidden (non-admin) → `403`
* Internal server error → `500`

---

## Acceptance Criteria

* Only admins can create quizzes.
* Quiz is successfully stored in the database.
* `created_by` is set automatically from the authenticated user.

---

## Definition of Done

* `POST /api/quizzes` works correctly.
* Tested with both admin and regular user accounts.
