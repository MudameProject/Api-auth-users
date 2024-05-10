import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  //   findById(id: string): Promise<User | null>;
  //   findByUsername(username: string): Promise<User | null>;
  create(UserDto: UserDto): Promise<User>;
}
