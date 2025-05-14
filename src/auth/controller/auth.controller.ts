import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Version,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Version('1')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user); // Return JWT token
  }
}
