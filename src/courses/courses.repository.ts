import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { NoteDto } from '../notes/dto/note.dto';
import { Note } from '../notes/notes.entity';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  async getNotes(courseId: number): Promise<Note[]> {
    const course = await this.getCourseWithNoteRelation(courseId);
    if (course) {
      return course.notes;
    } else {
      throw new ConflictException('There is no course with the provided ID');
    }
  }

  async createNote(courseId: number, noteDto: NoteDto): Promise<void> {
    const note = new Note();
    const course = await this.getCourseWithNoteRelation(courseId);
    if (!course) {
      throw new ConflictException('There is no course with the provided ID');
    }
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

  private async getCourseWithNoteRelation(courseId: number) {
    return await this.findOne({
      relations: ['notes'],
      where: { id: courseId },
    });
  }
}
