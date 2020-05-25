import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './couses.service';
import { CoursesRepository } from './courses.repository';
import { CoursesController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
