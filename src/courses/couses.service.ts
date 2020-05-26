import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private courseRepository: CoursesRepository,
  ) {}

  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne(id);
  }

  async getCoursesForTeam(teamId: number): Promise<Course[]> {
    return await this.courseRepository.getCoursesForTeam(teamId);
  }
}
