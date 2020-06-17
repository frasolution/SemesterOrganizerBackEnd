import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}
}
