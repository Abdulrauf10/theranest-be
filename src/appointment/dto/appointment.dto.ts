import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;
}
