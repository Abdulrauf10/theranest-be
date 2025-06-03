// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entity/user.entity';

export class UserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  name: string;

  @ApiProperty({ example: 'secret', description: 'Password for login' })
  password: string;

  @ApiProperty({ example: 'Admin', enum: Role, required: false })
  role?: Role;
}
