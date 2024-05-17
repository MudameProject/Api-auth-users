import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../commons/domain/repository/user.repository.interface';
import { UserMongooseRepository } from '../../../commons/domain/repository/user.mg.repository';
import { ICrudUserRepository } from './user.interface';
import { UserDto } from 'src/commons/domain/dto/user.dto';
@Injectable()
export class UserRepository implements ICrudUserRepository {
  constructor(
    @Inject(UserMongooseRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async creates(newProduct: UserDto): Promise<void> {
    await this.userRepository.create(newProduct);
  }
}
