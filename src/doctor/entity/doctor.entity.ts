// Import necessary decorators and classes from TypeORM and NestJS
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointment/entity/appointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the doctor' })
  id: string;

  @ManyToOne(() => User, (user) => user.doctor, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'Associated user entity' })
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    eager: true,
  })
  appointments: Appointment[];

  @Column()
  @ApiProperty({ description: 'Specialty of the doctor' })
  specialty: string;

  @Column()
  @ApiProperty({ description: 'Available day for appointments' })
  day: string;

  @Column({ name: 'user_id', nullable: true })
  user_id: string;

  @Column()
  @ApiProperty({ description: 'Available time for appointments' })
  time: string;
}
