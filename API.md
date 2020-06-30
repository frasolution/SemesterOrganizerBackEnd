# REST API Design


| API                                                                           | HTTP Verb          | Description                                                       |
| ----------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------- |
| /api/auth/signup/                                                             | POST               | register                                                          |
| /api/auth/signin/                                                             | POST               | login                                                             |
| /api/users/:userId                                                            | GET, DELETE        | get, delete specific users                                        |
| /api/teams/                                                                   | GET, POST          | get list of teams for user and create new team including the user |
| /api/teams/:teamId/                                                           | GET, DELETE, PATCH | get, delete and update specific teams                             |
| /api/teams/:teamId/courses                                                    | GET, POST          | get list of courses for team and create course for team           |
| /api/teams/:teamId/courses/:courseId                                          | GET, DELETE, PATCH | get, delete and update specific courses                           |
| /api/teams/:teamId/courses/:courseId/columns                                  | GET, POST          | get columns for specific course and create new columns            |
| /api/teams/:teamId/courses/:courseId/columns/:columnId                        | DELETE, PATCH      | delete and update specific columns                                |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks                  | POST               | create tasks for specific column                                  |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId          | DELETE, PATCH      | delete and update specific tasks                                  |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId/move     | PATCH              | move task to specific column                                      |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId/complete | PATCH              | mark task as completed                                            |
| /api/teams/:teamId/courses/:courseId/notes                                    | GET, POST          | get notes for specific course and create new notes                |
| /api/teams/:teamId/courses/:courseId/notes/:notesId                           | GET, DELETE, PATCH | get, delete and update specific notes                             |