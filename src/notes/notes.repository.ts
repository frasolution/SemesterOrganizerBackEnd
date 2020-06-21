import { EntityRepository, Repository } from 'typeorm';
import { Note } from './notes.entity';
import { NoteDto } from './dto/note.dto';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async editOne(noteDto: NoteDto, noteId: number): Promise<void> {
    const { title, description } = noteDto;
    const note = new Note();
    // if (title)
    note.title = title;
    // if (description)
    note.description = description;
    await this.update(noteId, note);
  }
}
