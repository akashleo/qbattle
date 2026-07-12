server/
│
├── src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── quizzes/
│   ├── challenges/
│   ├── sessions/
│   ├── notifications/
│   ├── leaderboard/
│   └── admin/
│
├── sockets/
│   ├── index.js
│   ├── challenge.socket.js
│   ├── session.socket.js
│   └── presence.socket.js
│
├── middleware/
│
├── services/
│   ├── GameService.js
│   ├── ChallengeService.js
│   ├── TimerService.js
│   ├── MailService.js
│   └── LeaderboardService.js
│
├── utils/
│
└── app.js



# session flow
Challenge Created
        │
        ▼
Pending
        │
        ▼
Accepted
        │
        ▼
Quiz Session Created
        │
        ▼
Player1 Connected
        │
Player2 Connected
        │
        ▼
Countdown
        │
        ▼
Running
        │
        ▼
Finished
        │
        ▼
Leaderboard Updated


# relationships 

Users
 │
 ├────────────┐
 │            │
 │            │
 ▼            ▼
Challenges    Sessions
 │             │
 │             │
 ▼             ▼
 Quiz        SessionPlayers
 │             │
 ▼             ▼
Questions   SessionAnswers


## Complete Schema
# users

id (uuid)
username
email
password_hash
role            -- admin | user
avatar_url
is_online
last_seen
created_at
updated_at


# quizzes

id (uuid)
title
description
duration_seconds
total_questions
created_by
is_active
created_at
updated_at

# questions

id (uuid)
quiz_id
question
option_a
option_b
option_c
option_d
correct_option
points
order_no
created_at

# challenge_requests

id (uuid)
quiz_id
challenger_id
opponent_id
status           -- pending | accepted | declined | expired | cancelled 
message
expires_at
accepted_at
declined_at
created_at

# quiz_sessions

id (uuid)
challenge_id
quiz_id
player1_id
player2_id
status        -- waiting | countdown | running | finished | abandoned 
winner_id
started_at
ended_at
created_at

# session_players

id
session_id
user_id
socket_id
score
correct_answers
wrong_answers
completed
completed_at
time_taken_ms
connected
joined_at

# session_answers

id
session_id
user_id
question_id
selected_option
is_correct
answered_at
response_time_ms

# notifications

id
user_id
type
title
body
reference_id
is_read
created_at

# audit_logs

id
admin_id
action
target_type
target_id
created_at

# refresh_tokens

id
user_id
token
expires_at
revoked
created_at

