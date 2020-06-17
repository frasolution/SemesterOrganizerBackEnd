import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository]), AuthModule],
  controllers: [],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
