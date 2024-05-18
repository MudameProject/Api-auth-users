import { Module } from '@nestjs/common';
import { AuthService } from './app/services/auth.service';
import { AuthController } from './infrastruture/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PersistanceModule } from 'src/commons/infrastructure/persistance/persistance.module';
import { AuthRepository } from './domain/repository/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: process.env.JWT_DURATION },
        };
      },
    }),
    PersistanceModule,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
