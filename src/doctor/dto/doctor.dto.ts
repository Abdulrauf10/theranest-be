import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty({
    example: 'Cardiology',
    description: 'Specialty of the doctor',
  })
  specialty: string;

  @ApiProperty({
    example: 'Monday',
    description: 'Available day for appointments',
  })
  day: string;

  @ApiProperty({
    example: '09:00',
    description: 'Available time for appointments',
  })
  time: string;

  @ApiProperty({
    example: 'uuid-here',
    description: 'User ID to assign as doctor',
  })
  user_id: string;
}
