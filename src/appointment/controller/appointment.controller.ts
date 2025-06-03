import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Version,
  Query,
} from '@nestjs/common';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentDto } from '../dto/appointment.dto';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiBody({ type: AppointmentDto })
  async create(@Body() dto: AppointmentDto): Promise<any> {
    return this.appointmentService.create(dto);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all appointmnents' })
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
      return this.appointmentService.findAll(page, limit, name, day, time);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred',
        error: 'Bad Request',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }
}
