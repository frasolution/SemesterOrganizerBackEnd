import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';
import { EditCourseDto } from './dto/edit-course.dto';
import { Note } from 'src/notes/notes.entity';
import { NoteDto } from 'src/notes/dto/note.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}

  async findOne(courseId: number): Promise<Course> {
    return await this.coursesRepository.findOne(courseId);
  }

  async removeOne(courseId: number): Promise<void> {
    await this.coursesRepository.delete(courseId);
  }

  async updateOne(
    editCourseDto: EditCourseDto,
    courseId: number,
  ): Promise<void> {
    const { courseName } = editCourseDto;
    await this.coursesRepository.update(courseId, { courseName });
  }

  async getNotes(courseId: number): Promise<Note[]> {
    return await this.coursesRepository.getNotes(courseId);
  }

  async createNote(courseId: number, noteDto: NoteDto): Promise<void> {
    return await this.coursesRepository.createNote(courseId, noteDto);
  }
}
