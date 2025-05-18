// Import necessary decorators and classes from TypeORM and NestJS
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the doctor' })
  id: string;

  @ManyToOne(() => User, (user) => user.doctor, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'Associated user entity' })
  user: User;

  @Column()
  @ApiProperty({ description: 'Specialty of the doctor' })
  specialty: string;

  @Column()
  @ApiProperty({ description: 'Available day for appointments' })
  day: string;

  @Column()
  @ApiProperty({ description: 'Available time for appointments' })
  time: string;
}
