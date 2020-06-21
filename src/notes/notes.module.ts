import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository])],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
