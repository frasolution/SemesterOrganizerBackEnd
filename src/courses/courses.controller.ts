import { Controller, Get, Param } from "@nestjs/common";
import { CoursesService } from "./couses.service";
import { Course } from "./courses.entity";


@Controller('course')
export class CoursesController {

    constructor(private readonly courseService: CoursesService){}

    /**
     * @param id module with this id will be returned via api
     * 
     * return the team with matching id as Promise
     */
    @Get(':id')
    findOne(@Param('id') id:number):Promise<Course>{
        return this.courseService.findOne(id);
    }

}