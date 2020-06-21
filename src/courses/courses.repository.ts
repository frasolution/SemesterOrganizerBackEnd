import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { NoteDto } from '../notes/dto/note.dto';
import { Note } from '../notes/notes.entity';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Columns } from 'src/columns/columns.entity';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  async getNotes(courseId: number): Promise<Note[]> {
    const course = await this.getCourseWithRelation('notes', courseId);
    if (course) {
      return course.notes;
    } else {
      throw new ConflictException('There is no course with the provided ID');
    }
  }

  async createNote(courseId: number, noteDto: NoteDto): Promise<void> {
    const note = new Note();
    const course = await this.getCourseWithRelation('notes', courseId);
    this.validateCourse(course);
    const { title, description } = noteDto;

    note.title = title;
    note.description = description;

    try {
      course.notes.push(note);
      course.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error while saving note for course',
      );
    }
  }

  async getColumns(courseId: number): Promise<Columns[]> {
    const course = await this.getCourseWithRelation('columns', courseId);
    if (course) {
      return course.columns;
    } else {
      throw new ConflictException('There is no course with the provided ID');
    }
  }

  async createColumn(
    courseId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<void> {
    const { columnName } = createColumnDto;
    const column = new Columns();
    const course = await this.getCourseWithRelation('columns', courseId);
    this.validateCourse(course);

    column.title = columnName;

    try {
      course.columns.push(column);
      course.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error while saving column for course',
      );
    }
  }

  private async getCourseWithRelation(relation: string, courseId: number) {
    return await this.findOne({
      relations: [relation],
      where: { id: courseId },
    });
  }

  private validateCourse(course: Course) {
    if (!course) {
      throw new ConflictException('There is no course with the provided ID');
    }
  }
}
