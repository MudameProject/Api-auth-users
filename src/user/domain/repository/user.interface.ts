import { UserDto } from '../../../commons/domain/dto/user.dto';

export interface ICrudUserRepository {
  create(newUser: UserDto): Promise<void>;
}
