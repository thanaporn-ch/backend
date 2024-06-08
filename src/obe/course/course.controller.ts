import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CourseService } from './course.service';
import { ErrorInterceptor } from 'src/common/interceptor/error.interceptor';
import { Course, CourseDocument } from './schemas/course.schema';
import { CourseManagementDocument } from '../courseManagement/schemas/courseManagement.schema';

@Controller('/courses')
export class CourseController {
  constructor(private service: CourseService) {}

  @Get()
  @UseInterceptors(new ErrorInterceptor())
  async searchAll(@Query() searchDTO: any): Promise<ResponseDTO<Course[]>> {
    return this.service.searchCourse(searchDTO).then((result) => {
      const responseDTO = new ResponseDTO<Course[]>();
      responseDTO.data = result;
      return responseDTO;
    });
  }

  @Post()
  @UseInterceptors(new ErrorInterceptor())
  async createCourse(
    @Request() req,
    @Body() requestDTO: any,
  ): Promise<ResponseDTO<Course>> {
    return this.service.createCourse(req.user.id, requestDTO).then((result) => {
      const responseDTO = new ResponseDTO<any>();
      responseDTO.data = result;
      return responseDTO;
    });
  }

  // @Delete('/:id')
  // @UseInterceptors(new ErrorInterceptor())
  // async deleteCourse(
  //   @Param('id') id: string,
  // ): Promise<ResponseDTO<Course>> {
  //   return this.service.deleteCourse(id).then((result) => {
  //     if (!result) {
  //       throw new BadRequestException('Course not found.');
  //     }
  //     const responseDTO = new ResponseDTO<Course>();
  //     responseDTO.data = result;
  //     return responseDTO;
  //   });
  // }
}