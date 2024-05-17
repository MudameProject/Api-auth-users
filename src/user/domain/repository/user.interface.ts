import { UserDto } from '../../../commons/domain/dto/user.dto';

export interface ICrudUserRepository {
  creates(newUser: UserDto): Promise<void>;
}
