import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository]), AuthModule],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
