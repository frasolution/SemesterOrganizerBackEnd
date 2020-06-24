import { EntityRepository, Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateAndUpdateNoteDto } from './dto/create-update-note.dto';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {}
