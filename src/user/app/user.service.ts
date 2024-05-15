import { Inject, Injectable } from '@nestjs/common';
import { ICrudUserRepository } from '../domain/repository/user.interface';
import { UserRepository } from '../domain/repository/user.repository';
import { IUserService } from './user.serivce.interface';
import { UserDto } from '../../commons/domain/dto/user.dto';
import { IResponse } from './user.serivce.interface';

@Injectable()
export class ServiceUser implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: ICrudUserRepository,
  ) {}

  async creates(newUser: UserDto): Promise<IResponse> {
    await this.userRepository.creates(newUser);
    return { message: 'Success', code: 200 };
  }
}
