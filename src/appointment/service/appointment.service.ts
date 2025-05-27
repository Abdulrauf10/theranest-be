import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entity/appointment.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entity/doctor.entity';
import { generateMedicalNumber } from '../utils/generate-medical-numbers.utils';
import { EmailService } from '../email/email.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepocitory: Repository<Doctor>,
  ) {}
}
