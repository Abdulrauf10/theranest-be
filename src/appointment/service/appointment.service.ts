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
    const { doctor_id, date, time } = dataAppointment;

    return this.appointmentRepository.manager.connection.transaction(
      async (manager) => {
        // Pessimistic write lock inside transaction
        const existing = await manager
          .createQueryBuilder(Appointment, 'appointment')
          .setLock('pessimistic_write')
          .where('appointment.doctor_id = :doctor_id', { doctor_id })
          .andWhere('appointment.date = :date', { date })
          .andWhere('appointment.time = :time', { time })
          .getOne();

        if (existing) {
          throw new Error('This time slot is already booked');
        }

        const medicalNumber = generateMedicalNumber();
        const newAppointment = this.appointmentRepository.create({
          ...dataAppointment,
          medicalNumber,
        });

        const saved = await manager.save(newAppointment);

        // Send confirmation after saving
        this.emailService.sendConfirmation(
          dataAppointment.email,
          medicalNumber,
          dataAppointment.date,
          dataAppointment.time,
        );

        return saved;
      },
    );
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
