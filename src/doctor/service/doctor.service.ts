import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '../entity/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  ) {}

  async create(doctorData: Partial<Doctor>): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create(doctorData);
    return this.doctorRepository.save(newDoctor);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    name?: string,
    day?: string,
    time?: string,
  ): Promise<Doctor[]> {
    const query = this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.user', 'user'); // Load related user info

    if (name) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (day) {
      query.andWhere(`doctor.availableDays LIKE :day`, { day: `%${day}%` });
    }

    if (time) {
      query.andWhere(
        'doctor.availableFrom <= :time AND doctor.availableTo >= :time',
        { time },
      );
    }

    // Apply pagination
    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  async findOne(id: string): Promise<Doctor> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async update(id: string, doctorData: Doctor): Promise<Doctor> {
    await this.doctorRepository.update(id, doctorData);
    return this.doctorRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
