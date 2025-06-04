import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the patient',
  })
  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the patient',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '2025-06-10',
    description: 'Date of the appointment (YYYY-MM-DD)',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: '14:00',
    description: 'Time of the appointment (HH:mm format)',
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    example: 'doctor-uuid-123',
    description: 'Unique ID of the doctor',
  })
  @IsString()
  @IsNotEmpty()
  doctor_id: string;
}
