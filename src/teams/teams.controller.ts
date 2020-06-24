import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { EditTeamDto } from './dto/edit-team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetUser } from '../auth/getUser.decorator';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { CoursesService } from '../courses/courses.service';
import { EditCourseDto } from '../courses/dto/edit-course.dto';
import { CreateCoursesDto } from '../courses/dto/create-courses.dto';
import { Note } from '../notes/notes.entity';
import { NotesService } from '../notes/notes.service';
import { NoteDto } from '../notes/dto/note.dto';
import { CreateAndUpdateColumnDto } from '../columns/dto/create-update-column.dto';
import { Columns } from '../columns/columns.entity';
import { CreateAndUpdateTaskDto } from '../tasks/dto/create-task.dto';
import { ColumnsService } from '../columns/columns.service';
import { TasksService } from '../tasks/tasks.service';
import { MoveTaskDto } from '../tasks/dto/move-task.dto';

@Controller('teams')
@UseGuards(AuthGuard())
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
    private readonly notesService: NotesService,
    private readonly columnsService: ColumnsService,
    private readonly tasksService: TasksService,
  ) {}

  // -------------------------- TEAMS ROUTES -------------------------- //
  @Get('/')
  getTeams(@GetUser() user: User): Promise<Team[]> {
    return this.teamsService.getTeams(user);
  }

  @Post('/')
  createTeam(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.teamsService.createTeam(createTeamDto, user);
  }

  @Patch(':teamId')
  editTeam(
    @Param('teamId') teamId: string,
    @Body(ValidationPipe) editTeamDto: EditTeamDto,
  ): Promise<void> {
    return this.teamsService.editTeam(teamId, editTeamDto);
  }

  @Get(':teamId')
  findTeam(@Param('teamId') teamId: string): Promise<Team> {
    return this.teamsService.findTeam(teamId);
  }

  @Delete(':teamId')
  removeTeam(@Param('teamId') teamId: string): Promise<void> {
    return this.teamsService.removeTeam(teamId);
  }

  // -------------------------- COURSES ROUTES -------------------------- //
  @Get(':teamId/courses')
  getCourses(@Param('teamId') teamId: string): Promise<Course[]> {
    return this.teamsService.getCourses(teamId);
  }

  @Post(':teamId/courses')
  createCourses(
    @Param('teamId') teamId: string,
    @Body(ValidationPipe) createCoursesDto: CreateCoursesDto,
  ): Promise<void> {
    return this.teamsService.createCourses(teamId, createCoursesDto);
  }

  @Get(':teamId/courses/:courseId')
  findCourse(@Param('courseId') courseId: string): Promise<Course> {
    return this.coursesService.findCourse(courseId);
  }

  @Delete(':teamId/courses/:courseId')
  removeCourse(@Param('courseId') courseId: string): Promise<void> {
    return this.coursesService.removeCourse(courseId);
  }

  @Patch(':teamId/courses/:courseId')
  updateCourse(
    @Body(ValidationPipe) editCourseDto: EditCourseDto,
    @Param('courseId') courseId: string,
  ): Promise<void> {
    return this.coursesService.updateCourse(editCourseDto, courseId);
  }

  // -------------------------- NOTES ROUTES -------------------------- //
  @Get(':teamId/courses/:courseId/notes')
  getNotes(@Param('courseId') courseId: string): Promise<Note[]> {
    return this.coursesService.getNotes(courseId);
  }

  @Post(':teamId/courses/:courseId/notes')
  createNote(
    @Param('courseId') courseId: string,
    @Body(ValidationPipe) noteDto: NoteDto,
  ): Promise<void> {
    return this.coursesService.createNote(courseId, noteDto);
  }

  @Get(':teamId/courses/:courseId/notes/:noteId')
  findNote(@Param('noteId') noteId: string): Promise<Note> {
    return this.notesService.findNote(noteId);
  }

  @Delete(':teamId/courses/:courseId/notes/:noteId')
  removeNote(@Param('noteId') noteId: string): Promise<void> {
    return this.notesService.removeNote(noteId);
  }

  @Patch(':teamId/courses/:courseId/notes/:noteId')
  updateNote(
    @Body(ValidationPipe) noteDto: NoteDto,
    @Param('noteId') noteId: string,
  ): Promise<void> {
    return this.notesService.updateNote(noteDto, noteId);
  }

  // -------------------------- COLUMN ROUTES -------------------------- //
  @Get(':teamId/courses/:courseId/columns/')
  getColumns(@Param('courseId') courseId: string): Promise<Columns[]> {
    return this.coursesService.getColumns(courseId);
  }

  @Post(':teamId/courses/:courseId/columns')
  createColumn(
    @Param('courseId') courseId: string,
    @Body(ValidationPipe) createColumnDto: CreateAndUpdateColumnDto,
  ): Promise<void> {
    return this.coursesService.createColumn(courseId, createColumnDto);
  }

  @Patch(':teamId/courses/:courseId/columns/:columnId')
  updateColumn(
    @Param('columnId') columnId: string,
    @Body(ValidationPipe) updateColumnDto: CreateAndUpdateColumnDto,
  ): Promise<void> {
    return this.columnsService.updateColumn(columnId, updateColumnDto);
  }

  @Delete(':teamId/courses/:courseId/columns/:columnId')
  deleteColumn(@Param('columnId') columnId: number): Promise<void> {
    return this.columnsService.deleteCoumn(columnId);
  }

  // -------------------------- TASKS ROUTES -------------------------- //
  @Post(':teamId/courses/:courseId/columns/:columnId/tasks')
  createTask(
    @Param('columnId') columnId: string,
    @Body(ValidationPipe) createTaskDto: CreateAndUpdateTaskDto,
  ): Promise<void> {
    return this.columnsService.createTask(columnId, createTaskDto);
  }

  @Delete(':teamId/courses/:courseId/columns/:columnId/tasks/:taskId')
  deleteTask(@Param('taskId') taskId: number): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch(':teamId/courses/:courseId/columns/:columnId/tasks/:taskId')
  updateTask(
    @Param('taskId') taskId: string,
    @Body(ValidationPipe) updateTaskDto: CreateAndUpdateTaskDto,
  ): Promise<void> {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @Patch(':teamId/courses/:courseId/columns/:columnId/tasks/:taskId/move')
  moveTask(
    @Param('columnId') columnId: string,
    @Param('taskId') taskId: string,
    @Body(ValidationPipe) moveTaskDto: MoveTaskDto,
  ): Promise<void> {
    return this.columnsService.moveTask(columnId, taskId, moveTaskDto);
  }

  @Patch(':teamId/courses/:courseId/columns/:columnId/tasks/:taskId/complete')
  completeTask(
    @Param('taskId') taskId: string,
    @Body() body: { isCompleted: boolean },
  ): Promise<void> {
    return this.tasksService.completeTask(taskId, body);
  }
}
