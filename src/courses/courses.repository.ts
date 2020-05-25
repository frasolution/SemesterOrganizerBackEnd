import { EntityRepository, Repository } from 'typeorm';
import { Course } from './courses.entity';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {}
