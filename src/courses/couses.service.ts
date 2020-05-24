
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoursesRepository } from "./courses.repository";
import { Course } from "./courses.entity";

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(CoursesRepository)
        private courseRepository:CoursesRepository,
    ){}

    findOne(id:number): Promise<Course>{
        return this.courseRepository.findOne(id);
    }

    // async remove(id:number): Promise<void>{
    //     await this.courseRepository.delete(id);
    // }
}
