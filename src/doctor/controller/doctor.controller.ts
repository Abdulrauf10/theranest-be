import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/entity/user.entity';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../entity/doctor.entity';

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
  async create(@Body() doctorData: Partial<Doctor>) {
    return this.doctorService.create(doctorData);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get doctor by id' })
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
}
