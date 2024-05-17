import { User } from 'src/commons/domain/entities/user.entity';
import { UserDto } from '../../../commons/domain/dto/user.dto';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(UserDto: UserDto): Promise<User>;
}
