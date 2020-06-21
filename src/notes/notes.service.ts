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

  async findOne(noteId: number): Promise<Note> {
    return await this.notesRepository.findOne(noteId);
  }

  async removeOne(noteId: number): Promise<void> {
    await this.notesRepository.delete(noteId);
  }

  async updateOne(noteDto: NoteDto, noteId: number): Promise<void> {
    return await this.notesRepository.editOne(noteDto, noteId);
  }
}
