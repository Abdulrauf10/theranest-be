import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/module/users.module';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { AuthController } from '../controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // Provide AuthService and JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}
