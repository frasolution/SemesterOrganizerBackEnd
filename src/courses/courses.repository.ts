import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';
import { NotImplementedException } from '@nestjs/common';
import { TeamsRepository } from '../teams/teams.repository';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {}
