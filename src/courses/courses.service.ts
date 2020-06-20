import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';
import { Course } from './courses.entity';
import { EditCourseDto } from './dto/edit-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}

  async findOne(courseId: number): Promise<Course> {
    return await this.coursesRepository.findOne(courseId);
  }

  async removeOne(courseId: number): Promise<void> {
    await this.coursesRepository.delete(courseId);
  }

  //TODO optimize
  async updateOne(
    editCourseDto: EditCourseDto,
    courseId: number,
  ): Promise<void> {
    const course = await this.coursesRepository.findOne(courseId).catch();
    course.courseName = editCourseDto.courseName;
    await this.coursesRepository.update(courseId, course);
    return;
  }
}
