import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { Role } from '../entity/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Version('1')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() userData: any) {
    return this.usersService.create(userData);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all users (optionally filtered by role)' })
  @ApiQuery({ name: 'role', enum: Role, required: false })
  async getAllUsers(@Query('role') role?: Role) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
