import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { NoteDto } from 'src/notes/dto/note.dto';
import { Note } from 'src/notes/notes.entity';
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
    const newNotes: Note[] = [];
    const course = await this.getCourseWithNoteRelation(courseId);
    const { title, description } = noteDto;

    const note = new Note();
    note.title = title;
    note.description = description;
    newNotes.push(note);

    try {
      course.notes = course.notes.concat(newNotes);
      course.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async getCourseWithNoteRelation(courseId: number) {
    return await this.findOne({
      relations: ['notes'],
      where: { id: courseId },
    });
  }
}
