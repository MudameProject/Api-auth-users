import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { Controller } from '@nestjs/common';
import { UserService } from './app/user.service';

@Controller()
@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
