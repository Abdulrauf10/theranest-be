import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Doctor } from 'src/doctor/entity/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Appointment id' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Patient name' })
  patient_name: string;

  @Column()
  @ApiProperty({ description: 'Patient email' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Appointment date' })
  date: string;

  @Column()
  @ApiProperty({ description: 'Appointment time' })
  time: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Medical number auto generated' })
  medicalNumber: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  @ApiProperty({ description: 'Doctor id' })
  doctor: Doctor;

  @Column({ default: false })
  @ApiProperty({ description: 'Registration confirmation' })
  confirmed: boolean;
}
