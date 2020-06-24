import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';
import { Note } from './notes.entity';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private notesRepository: NotesRepository,
  ) {}

  async findNote(noteId: string): Promise<Note> {
    return await this.notesRepository.findOne(noteId);
  }

  async removeNote(noteId: string): Promise<void> {
    await this.notesRepository.delete(noteId);
  }

  async updateNote(noteDto: NoteDto, noteId: string): Promise<void> {
    return await this.notesRepository.editOne(noteDto, noteId);
  }
}
