# Backend Ticket 002 - Configure Supabase & Create Database Schema

## Epic

Backend Foundation

---

## Goal

Configure Supabase as the application's database provider and create the initial database schema required for the quiz application.

At the end of this ticket, the backend should be able to establish a connection to Supabase, and all required tables should exist.

No authentication or business logic should be implemented yet.

---

## Dependencies

* ✅ Backend Ticket 001

---

## Priority

High

---

## Estimated Time

60 - 90 minutes

---

## Description

Create a new Supabase project and configure the backend to communicate with it using the official Supabase JavaScript SDK.

Design the database carefully. Future features like matchmaking, real-time sessions, notifications, and leaderboards should not require schema redesign.

The database should represent the source of truth. The Socket server will only synchronize clients.

---

# Tasks

## 1. Create Supabase Project

Create a new Supabase project.

Save the following credentials.

* Project URL
* Anon Key
* Service Role Key

Update the `.env` file.

```text
SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

---

## 2. Install Supabase SDK

Install

```bash
@supabase/supabase-js
```

---

## 3. Create Supabase Client

Create

```text
src/config/supabase.js
```

Responsibilities

* Initialize Supabase client
* Export singleton instance
* Read configuration from environment variables

---

## 4. Create Database Schema

Create the following tables.

---

### users

| Column        | Type            |
| ------------- | --------------- |
| id            | uuid (PK)       |
| username      | text            |
| email         | text (unique)   |
| password_hash | text            |
| role          | text            |
| avatar_url    | text (nullable) |
| is_online     | boolean         |
| last_seen     | timestamptz     |
| created_at    | timestamptz     |
| updated_at    | timestamptz     |

---

### quizzes

| Column           | Type        |
| ---------------- | ----------- |
| id               | uuid        |
| title            | text        |
| description      | text        |
| duration_seconds | integer     |
| total_questions  | integer     |
| created_by       | uuid        |
| is_active        | boolean     |
| created_at       | timestamptz |
| updated_at       | timestamptz |

---

### questions

| Column         | Type        |
| -------------- | ----------- |
| id             | uuid        |
| quiz_id        | uuid        |
| question       | text        |
| option_a       | text        |
| option_b       | text        |
| option_c       | text        |
| option_d       | text        |
| correct_option | text        |
| points         | integer     |
| order_no       | integer     |
| created_at     | timestamptz |

---

### challenge_requests

| Column        | Type        |
| ------------- | ----------- |
| id            | uuid        |
| quiz_id       | uuid        |
| challenger_id | uuid        |
| opponent_id   | uuid        |
| status        | text        |
| message       | text        |
| expires_at    | timestamptz |
| accepted_at   | timestamptz |
| declined_at   | timestamptz |
| created_at    | timestamptz |

---

### quiz_sessions

| Column       | Type            |
| ------------ | --------------- |
| id           | uuid            |
| challenge_id | uuid (nullable) |
| quiz_id      | uuid            |
| player1_id   | uuid            |
| player2_id   | uuid            |
| status       | text            |
| winner_id    | uuid (nullable) |
| started_at   | timestamptz     |
| ended_at     | timestamptz     |
| created_at   | timestamptz     |

---

### session_players

| Column          | Type            |
| --------------- | --------------- |
| id              | uuid            |
| session_id      | uuid            |
| user_id         | uuid            |
| socket_id       | text (nullable) |
| score           | integer         |
| correct_answers | integer         |
| wrong_answers   | integer         |
| completed       | boolean         |
| completed_at    | timestamptz     |
| time_taken_ms   | integer         |
| connected       | boolean         |
| joined_at       | timestamptz     |

---

### session_answers

| Column           | Type        |
| ---------------- | ----------- |
| id               | uuid        |
| session_id       | uuid        |
| user_id          | uuid        |
| question_id      | uuid        |
| selected_option  | text        |
| is_correct       | boolean     |
| answered_at      | timestamptz |
| response_time_ms | integer     |

---

### notifications

| Column       | Type            |
| ------------ | --------------- |
| id           | uuid            |
| user_id      | uuid            |
| type         | text            |
| title        | text            |
| body         | text            |
| reference_id | uuid (nullable) |
| is_read      | boolean         |
| created_at   | timestamptz     |

---

### audit_logs

| Column      | Type        |
| ----------- | ----------- |
| id          | uuid        |
| admin_id    | uuid        |
| action      | text        |
| target_type | text        |
| target_id   | uuid        |
| created_at  | timestamptz |

---

## 5. Create Foreign Keys

Implement relationships.

```text
users
 ├── quizzes.created_by
 ├── challenge_requests.challenger_id
 ├── challenge_requests.opponent_id
 ├── quiz_sessions.player1_id
 ├── quiz_sessions.player2_id
 ├── quiz_sessions.winner_id
 ├── session_players.user_id
 ├── session_answers.user_id
 ├── notifications.user_id
 └── audit_logs.admin_id

quizzes
 ├── questions.quiz_id
 ├── challenge_requests.quiz_id
 └── quiz_sessions.quiz_id

challenge_requests
 └── quiz_sessions.challenge_id

quiz_sessions
 ├── session_players.session_id
 └── session_answers.session_id

questions
 └── session_answers.question_id
```

---

## 6. Default Values

Configure sensible defaults.

Examples

* `created_at = now()`
* `updated_at = now()`
* `score = 0`
* `completed = false`
* `connected = false`
* `is_online = false`
* `role = 'user'`
* `status = 'pending'` (challenge)
* `status = 'waiting'` (session)

---

## 7. Create Indexes

Add indexes for frequently queried fields.

Suggested indexes

* users.email
* users.username
* quizzes.created_by
* questions.quiz_id
* challenge_requests.opponent_id
* challenge_requests.status
* quiz_sessions.status
* session_players.session_id
* session_answers.session_id
* notifications.user_id

---

## Acceptance Criteria

* Supabase project created.
* Backend successfully initializes the Supabase client.
* All database tables created.
* Foreign key relationships configured.
* Default values configured.
* Recommended indexes added.
* No backend routes created.
* No authentication implemented.
* No business logic implemented.

---

## Test Cases

* Backend starts without errors.
* Supabase client initializes successfully.
* All tables are visible in the Supabase dashboard.
* Foreign keys are enforced.
* Inserts with default values work as expected.
* Invalid foreign key inserts fail.

---

## Out of Scope

The following will be implemented in later tickets.

* User registration
* Login
* JWT
* Row Level Security (RLS)
* CRUD APIs
* Socket server
* Email notifications

---

## Deliverables

* Supabase project configured
* Database schema created
* Foreign key relationships
* Database indexes
* Backend connected to Supabase

---

## Definition of Done

* Backend connects to Supabase successfully.
* Every required table exists.
* Foreign keys validate correctly.
* Indexes are created.
* Project is ready to begin authentication (Backend Ticket 003).
