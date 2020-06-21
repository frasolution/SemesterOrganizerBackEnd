import { EntityRepository, Repository } from 'typeorm';
import { Note } from './notes.entity';
import { NoteDto } from './dto/note.dto';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async editOne(noteDto: NoteDto, noteId: number): Promise<void> {
    const { title, description } = noteDto;
    const note = new Note();
    note.title = title;
    note.description = description;
    await this.update(noteId, note);
  }
}
