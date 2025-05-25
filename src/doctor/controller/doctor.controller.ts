import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/entity/user.entity';
import { DoctorService } from '../service/doctor.service';
import { DoctorDto } from '../dto/doctor.dto';

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
  async create(@Body() doctorData: Partial<DoctorDto>, @Request() req) {
    console.log('User:', req.user);
    return this.doctorService.create(doctorData);
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
    return this.doctorService.findAll(page, limit, name, day, time);
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
    return this.doctorService.update(id, doctorData);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a doctor by id' })
  async remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
