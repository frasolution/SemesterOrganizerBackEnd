import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoursesService } from './couses.service';
import { Course } from './courses.entity';

@Controller('courses')
@UseGuards(AuthGuard())
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get(':teamId')
  getCoursesForTeam(@Param('teamId') teamId: number): Promise<Course[]> {
    return this.courseService.getCoursesForTeam(teamId);
  }

  /**
   * @param id module with this id will be returned via api
   *
   * return the team with matching id as Promise
   */
  @Get('/course/:courseId')
  findOne(@Param('courseId') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }
}
