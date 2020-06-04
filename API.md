# REST API Design


| API                                                 | HTTP Verb          | Description                                                       |
| --------------------------------------------------- | ------------------ | ----------------------------------------------------------------- |
| /api/auth/signup/                                   | POST               | register                                                          |
| /api/auth/signin/                                   | POST               | login                                                             |
| /api/users/:userId                                  | GET, DELETE, PATCH | get, delete and update specific users                             |
| /api/teams/                                         | GET, POST          | get list of teams for user and create new team including the user |
| /api/teams/:teamId/                                 | GET, DELETE, PATCH | get, delete and update specific teams                             |
| /api/teams/:teamId/courses                          | GET, POST          | get list of courses for team and create course for team           |
| /api/teams/:teamId/courses/:courseId                | GET, DELETE, PATCH | get, delete and update specific courses                           |
| /api/teams/:teamId/courses/:courseId/tasks          | GET, POST          | get tasks for specific course and create new tasks                |
| /api/teams/:teamId/courses/:courseId/tasks/:taskId  | GET, DELETE, PATCH | get, delete and update specific tasks                             |
| /api/teams/:teamId/courses/:courseId/notes          | GET, POST          | get notes for specific course and create new notes                |
| /api/teams/:teamId/courses/:courseId/notes/:notesId | GET, DELETE, PATCH | get, delete and update specific notes                             |