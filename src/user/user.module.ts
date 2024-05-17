import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../commons/domain/entities/user.entity';
import { ServiceUser } from './app/user.service';
import { UserRepository } from './domain/repository/user.repository';
import { UserMongooseRepository } from 'src/commons/domain/repository/user.mg.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [ServiceUser, UserRepository, UserMongooseRepository],
  controllers: [UserController],
})
export class UserModule {}
