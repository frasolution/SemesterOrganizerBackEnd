# REST API Design


| API Endpoint                                                                  | HTTP Verb          | Description                                                   |
| ----------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------- |
| /api/auth/signup/                                                             | POST               | user registration                                             |
| /api/auth/signin/                                                             | POST               | user login                                                    |
| /api/users/:userId                                                            | GET, DELETE        | get/delete a specific user                                    |
| /api/teams/                                                                   | GET, POST          | get list of teams for user/create new team including the user |
| /api/teams/:teamId/                                                           | GET, DELETE, PATCH | get/delete/update specific team                               |
| /api/teams/:teamId/courses                                                    | GET, POST          | get list of courses for team/create course for team           |
| /api/teams/:teamId/courses/:courseId                                          | GET, DELETE, PATCH | get/delete/update specific courses                            |
| /api/teams/:teamId/courses/:courseId/columns                                  | GET, POST          | get columns for specific course/create new column             |
| /api/teams/:teamId/courses/:courseId/columns/:columnId                        | DELETE, PATCH      | delete/update specific column                                 |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks                  | POST               | create task for specific column                               |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId          | DELETE, PATCH      | delete/update specific task                                   |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId/move     | PATCH              | move task to specific column                                  |
| /api/teams/:teamId/courses/:courseId/columns/:columnId/tasks/:taskId/complete | PATCH              | mark task as completed                                        |
| /api/teams/:teamId/courses/:courseId/notes                                    | GET, POST          | get notes for specific course/create new note                 |
| /api/teams/:teamId/courses/:courseId/notes/:notesId                           | GET, DELETE, PATCH | get/delete/update specific note                               |