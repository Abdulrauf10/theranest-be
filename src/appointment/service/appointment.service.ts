import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entity/appointment.entity';
import { Repository } from 'typeorm';
import { generateMedicalNumber } from '../utils/generate-medical-numbers.utils';
import { EmailService } from '../email/email.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly emailService: EmailService,
  ) {}

  async create(dataAppointment: Partial<Appointment>): Promise<Appointment> {
    const medicalNumber = generateMedicalNumber();
    const newAppointment = this.appointmentRepository.create({
      ...dataAppointment,
      medicalNumber,
    });

    const saved = this.appointmentRepository.save(newAppointment);

    this.emailService.sendConfirmation(
      dataAppointment.email,
      medicalNumber,
      dataAppointment.date,
      dataAppointment.time,
    );
    return saved;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    name?: string,
    date?: string,
    time?: string,
  ): Promise<Appointment[]> {
    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'user');

    if (name) {
      query.andWhere(
        'LOWER(appointment.patient_name) LIKE LOWER(:patient_name)',
        {
          patient_name: `%${name}%`,
        },
      );
    }

    if (date) {
      query.andWhere('appointment.date = :date', { day: `%${date}%` });
    }

    if (time) {
      query.andWhere('appointment.time = :time', { time: `%${time}` });
    }

    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }
}
