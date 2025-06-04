import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entity/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'admin', description: 'User role' })
  role: Role;
}
