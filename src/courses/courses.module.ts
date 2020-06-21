import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository])],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
