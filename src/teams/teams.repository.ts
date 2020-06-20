import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from '../users/users.repository';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { CreateCoursesDto } from '../courses/dto/create-courses.dto';
import { allCourses } from '../courses/data/fra-uas-courses.data';

@EntityRepository(Team)
export class TeamsRepository extends Repository<Team> {
  async getTeams(
    user: User,
    usersRepository: UsersRepository,
  ): Promise<Team[]> {
    const userEntity = await usersRepository.find({
      relations: ['teams'],
      where: { id: user.id },
    });

    return userEntity[0].teams;
  }

  async createTeam(
    createTeamDto: CreateTeamDto,
    usersRepository: UsersRepository,
    user: User,
  ): Promise<void> {
    const { teamName, usernames } = createTeamDto;
    const team = this.create();
    const foundUsers = await usersRepository
      .createQueryBuilder('user')
      .where('user.username IN (:...usernames)', { usernames: usernames })
      .getMany();

    if (foundUsers.length !== usernames.length) {
      throw new ConflictException(
        'Could not find certain users for team creation',
      );
    }

    // add the user who created the team too, if he did not provided his username
    if (!foundUsers.includes(user)) {
      foundUsers.push(user);
    }

    team.name = teamName;
    team.users = foundUsers;
    team.courses = [];

    try {
      await team.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Team with provided users already exists');
      } else {
        console.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getCourses(teamId: number): Promise<Course[]> {
    const team = await this.getTeamWithCourseRelation(teamId);
    if (team) {
      return team.courses;
    } else {
      throw new ConflictException('There is no team with the provided ID');
    }
  }

  async createCourses(
    teamId: number,
    createCoursesDto: CreateCoursesDto,
  ): Promise<void> {
    const newCourses: Course[] = [];
    const { courseNames } = createCoursesDto;
    const team = await this.getTeamWithCourseRelation(teamId);

    // check if course is already existing for team
    team.courses.forEach(course => {
      if (courseNames.includes(course.courseName)) {
        throw new ConflictException(
          'One of the provided courses is a duplicate!',
        );
      }
    });

    // create courses and add them to existing ones
    courseNames.forEach(name => {
      const foundCourse = allCourses.find(c => c.courseName === name);
      const course = new Course();

      course.courseNumber = foundCourse.courseNumber;
      course.courseName = foundCourse.courseName;
      course.courseSemester = foundCourse.courseSemester;
      course.courseCP = foundCourse.courseCP;

      newCourses.push(course);
    });

    try {
      team.courses = team.courses.concat(newCourses);
      team.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async getTeamWithCourseRelation(teamId: number) {
    return await this.findOne({
      relations: ['courses'],
      where: { id: teamId },
    });
  }
}
