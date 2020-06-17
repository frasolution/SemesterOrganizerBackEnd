import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';
import { TeamsRepository } from '../teams/teams.repository';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private courseRepository: CoursesRepository,
  ) {}
}
