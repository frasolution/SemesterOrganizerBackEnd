import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';
import { EditCourseDto } from './dto/edit-course.dto';
import { Note } from '../notes/notes.entity';
import { NoteDto } from '../notes/dto/note.dto';
import { CreateAndUpdateColumnDto } from 'src/columns/dto/create-update-column.dto';
import { Columns } from 'src/columns/columns.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}

  async findCourse(courseId: string): Promise<Course> {
    return await this.coursesRepository.findOne(courseId);
  }

  async removeCourse(courseId: string): Promise<void> {
    await this.coursesRepository.delete(courseId);
  }

  async updateCourse(
    editCourseDto: EditCourseDto,
    courseId: string,
  ): Promise<void> {
    const { courseName } = editCourseDto;
    await this.coursesRepository.update(courseId, { courseName });
  }

  async getNotes(courseId: string): Promise<Note[]> {
    return await this.coursesRepository.getNotes(courseId);
  }

  async getColumns(courseId: string): Promise<Columns[]> {
    return await this.coursesRepository.getColumns(courseId);
  }

  async createNote(courseId: string, noteDto: NoteDto): Promise<void> {
    return await this.coursesRepository.createNote(courseId, noteDto);
  }

  async createColumn(
    courseId: string,
    createColumnDto: CreateAndUpdateColumnDto,
  ): Promise<void> {
    return await this.coursesRepository.createColumn(courseId, createColumnDto);
  }
}
