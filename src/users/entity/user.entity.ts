import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctor/entity/doctor.entity';

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

  @ApiProperty({ description: 'Associated doctor entity' })
  @OneToMany(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor[];
}
