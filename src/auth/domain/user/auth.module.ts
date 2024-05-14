import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../../infrastruture/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PersistanceModule } from 'src/commons/infrastructure/persistance/persistance.module';
import { UserMongooseRepository } from 'src/commons/domain/repository/user.mg.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserMongooseRepository],
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
