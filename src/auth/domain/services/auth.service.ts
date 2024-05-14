import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { registerUserDto } from '../dto/request-user.dto';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { UserMongooseRepository } from 'src/commons/domain/repository/user.mg.repository';
import { User } from 'src/commons/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserMongooseRepository) {}

  async registerUser(userObject: registerUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(
      userObject.username,
    );
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const { password } = userObject;
    const plainToHash = await hash(password, 10);

    const newUser: UserDto = new UserDto();
    newUser.email = userObject.email;
    newUser.username = userObject.username;
    newUser.password = plainToHash;

    const createdUser = await this.userRepository.create(newUser);
    console.log(createdUser);
    return createdUser;
  }
}
