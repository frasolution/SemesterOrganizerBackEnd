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

@Controller('teams')
@UseGuards(AuthGuard())
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly coursesService: CoursesService,
    private readonly notesService: NotesService,
  ) {}

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
    @Param('teamId') teamId: number,
    @Body(ValidationPipe) editTeamDto: EditTeamDto,
  ): Promise<void> {
    return this.teamsService.editTeam(teamId, editTeamDto);
  }

  @Get(':teamId')
  findOne(@Param('teamId') teamId: number): Promise<Team> {
    return this.teamsService.findOne(teamId);
  }

  @Delete(':teamId')
  remove(@Param('teamId') teamId: number): Promise<void> {
    return this.teamsService.remove(teamId);
  }

  @Get(':teamId/courses')
  getCourses(@Param('teamId') teamId: number): Promise<Course[]> {
    return this.teamsService.getCourses(teamId);
  }

  @Post(':teamId/courses')
  createCourses(
    @Param('teamId') teamId: number,
    @Body(ValidationPipe) createCoursesDto: CreateCoursesDto,
  ): Promise<void> {
    return this.teamsService.createCourses(teamId, createCoursesDto);
  }

  @Get(':teamId/courses/:courseId')
  findOneCourse(@Param('courseId') courseId: number): Promise<Course> {
    return this.coursesService.findOne(courseId);
  }

  @Delete(':teamId/courses/:courseId')
  removeOneCourse(@Param('courseId') courseId: number): Promise<void> {
    return this.coursesService.removeOne(courseId);
  }

  @Patch(':teamId/courses/:courseId')
  updateOneCourse(
    @Body(ValidationPipe) editCourseDto: EditCourseDto,
    @Param('courseId') courseId: number,
  ): Promise<void> {
    return this.coursesService.updateOne(editCourseDto, courseId);
  }

  @Get(':teamId/courses/:courseId/notes')
  getAllCoursesNotes(@Param('courseId') courseId: number): Promise<Note[]> {
    return this.coursesService.getNotes(courseId);
  }

  @Post(':teamId/courses/:courseId/notes')
  createNote(
    @Param('courseId') courseId: number,
    @Body(ValidationPipe) noteDto: NoteDto,
  ): Promise<void> {
    return this.coursesService.createNote(courseId, noteDto);
  }

  @Get(':teamId/courses/:courseId/notes/:noteId')
  //not affiliated with OneNote™
  findOneNote(@Param('noteId') noteId: number): Promise<Note> {
    return this.notesService.findOne(noteId);
  }

  @Delete(':teamId/courses/:courseId/notes/:noteId')
  //not affiliated with OneNote™
  removeOneNote(@Param('noteId') noteId: number): Promise<void> {
    return this.notesService.removeOne(noteId);
  }

  @Patch(':teamId/courses/:courseId/notes/:noteId')
  updateOneNote(
    @Body(ValidationPipe) noteDto: NoteDto,
    @Param('noteId') noteId: number,
  ): Promise<void> {
    return this.notesService.updateOne(noteDto, noteId);
  }
}
