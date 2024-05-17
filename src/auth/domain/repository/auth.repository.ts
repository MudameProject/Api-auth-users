import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../commons/domain/repository/user.repository.interface';
import { UserMongooseRepository } from '../../../commons/domain/repository/user.mg.repository';
import { IAuthRepository } from './auth.interface';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from 'src/commons/domain/entities/user.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(UserMongooseRepository)
    private readonly authRepository: IUserRepository,
  ) {}
  async findByUsername(username: string): Promise<User> {
    return await this.authRepository.findByUsername(username);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.authRepository.findByEmail(email);
  }
  async create(userDto: UserDto): Promise<User> {
    return await this.authRepository.create(userDto);
  }
}
