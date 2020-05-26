import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { NotImplementedException } from '@nestjs/common';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  async getCoursesForTeam(teamId: number): Promise<Course[]> {
    console.log(teamId);
    throw new NotImplementedException('Not implemented yet.');
  }
}
