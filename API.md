# REST API

- This is a potential API design
- The term `Course` refers to the german `Modul`
  - The reason for that choice is since we will have a Nest module for this business logic, we would have a class called `ModuleModule` which is not so elegant. The synonym `course` fits better here

| API                                          | HTTP Verb          | Description                                  |
| -------------------------------------------- | ------------------ | -------------------------------------------- |
| /api/auth/signup/                            | POST               | register                                     |
| /api/auth/signin/                            | POST               | login                                        |
| /api/users/:userId                           | GET, DELETE, PATCH | read/delete/update user                      |
| /api/teams/                                  | GET, POST          | read/create teams                            |
| /api/teams/:teamId/                          | GET, DELETE, PATCH | read/delete/update team                      |
| /api/courses/                                | GET, POST          | read/create courses                          |
| /api/courses/:courseId/                      | GET, DELETE, PATCH | read/delete/update course                    |
| /api/courses/:teamId/                        | GET                | read all courses for team                    |
| /api/courses/:teamId/:courseId/              | GET, DELETE, PATCH | read/delete/update course reference for team |
| /api/courses/:teamId/:courseId/tasks/        | GET, POST          | read/create tasks                            |
| /api/courses/:teamId/:courseId/tasks/:taskId | GET, DELETE, PATCH | read/delete/update task                      |
| /api/courses/:teamId/:courseId/notes/        | GET, POST          | read/create notes                            |
| /api/courses/:teamId/:courseId/tasks/:noteId | GET, DELETE, PATCH | read/delete/update note                      |