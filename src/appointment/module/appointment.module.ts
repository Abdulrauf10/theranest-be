import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entity/appointment.entity';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentController } from '../controller/appointment.controller';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService, EmailService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}
