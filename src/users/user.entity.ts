import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  Admin = 'admin',
  Patient = 'patient',
  Doctor = 'doctor',
}

@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier', example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User password', example: 'hashedpassword' })
  @Column()
  password: string;

  @ApiProperty({ description: 'User role', example: 'admin' })
  @Column({ type: 'enum', enum: Role, default: Role.Patient })
  role: Role;
}
