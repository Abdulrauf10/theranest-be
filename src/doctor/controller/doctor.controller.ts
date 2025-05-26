import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/entity/user.entity';
import { DoctorService } from '../service/doctor.service';
import { DoctorDto } from '../dto/doctor.dto';

@ApiSecurity('jwt')
@ApiTags('Doctors')
@ApiBearerAuth()
@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiBody({ type: DoctorDto })
  async create(@Body() doctorData: Partial<DoctorDto>) {
    try {
      const createdDoctor = await this.doctorService.create(doctorData);
      return {
        message: 'Doctor created successfully',
        data: createdDoctor,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred',
        error: 'Bad Request',
      };
    }
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'name', required: false, example: 'John' })
  @ApiQuery({ name: 'day', required: false, example: 'Monday' })
  @ApiQuery({ name: 'time', required: false, example: '14:00' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('day') day?: string,
    @Query('time') time?: string,
  ) {
    try {
      return this.doctorService.findAll(page, limit, name, day, time);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred',
        error: 'Bad Request',
      };
    }
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get doctor by id' })
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update a doctor by id' })
  @ApiBody({ type: DoctorDto })
  async update(
    @Param('id') id: string,
    @Body() doctorData: Partial<DoctorDto>,
  ) {
    try {
      return this.doctorService.update(id, doctorData);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred',
        error: 'Bad Request',
      };
    }
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a doctor by id' })
  async remove(@Param('id') id: string) {
    try {
      return this.doctorService.remove(id);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred',
        error: 'Bad Request',
      };
    }
  }
}
