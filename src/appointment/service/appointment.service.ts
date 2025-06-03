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
    day?: string,
    time?: string,
  ): Promise<Appointment[]> {
    const query = this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor');

    if (name) {
      query.andWhere('LOWER(doctor.user.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (day) {
      query.andWhere('appointment.day = :day', { day: `%${day}%` });
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
