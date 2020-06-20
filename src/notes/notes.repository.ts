import { EntityRepository, Repository } from 'typeorm';
import { Note } from './notes.entity';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {}
