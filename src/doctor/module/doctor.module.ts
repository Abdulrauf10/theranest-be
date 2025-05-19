import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../entity/doctor.entity';
import { DoctorService } from '../service/doctor.service';
import { DoctorController } from '../controller/doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
