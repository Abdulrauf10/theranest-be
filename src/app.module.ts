import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/module/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PORT_DATABASE),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
