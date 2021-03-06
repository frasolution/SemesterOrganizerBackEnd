import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { CreateAndUpdateNoteDto } from '../notes/dto/create-update-note.dto';
import { Note } from '../notes/notes.entity';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Columns } from 'src/columns/columns.entity';
import { CreateAndUpdateColumnDto } from 'src/columns/dto/create-update-column.dto';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  async getNotes(courseId: string): Promise<Note[]> {
    const course = await this.getCourseWithRelation('notes', courseId);
    if (course) {
      return course.notes;
    } else {
      throw new ConflictException('There is no course with the provided ID');
    }
  }

  async createNote(
    courseId: string,
    createNoteDto: CreateAndUpdateNoteDto,
  ): Promise<void> {
    const course = await this.getCourseWithRelation('notes', courseId);
    this.validateCourse(course);

    const { noteTitle, noteDescription } = createNoteDto;

    const note = new Note();
    note.title = noteTitle;
    note.description = noteDescription;

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

  async getColumns(courseId: string): Promise<Columns[]> {
    const course = await this.findOne({
      relations: ['columns', 'columns.tasks'],
      where: { id: courseId },
    });
    if (course) {
      return course.columns;
    } else {
      throw new ConflictException('There is no course with the provided ID');
    }
  }

  async createColumn(
    courseId: string,
    createColumnDto: CreateAndUpdateColumnDto,
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

  private async getCourseWithRelation(relation: string, courseId: string) {
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
