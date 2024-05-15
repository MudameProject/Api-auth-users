import { HttpException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { registerUserDto, loginUserDto } from '../dto/request-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { UserMongooseRepository } from 'src/commons/domain/repository/user.mg.repository';
import { User } from 'src/commons/domain/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserMongooseRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  async loginUser(userObject: loginUserDto): Promise<ResponseUserDto> {
    console.log(userObject);

    const existingUser = await this.userRepository.findByEmail(
      userObject.email,
    );
    console.log(existingUser);

    if (!existingUser) {
      throw new HttpException('Email does not exists', 404);
    }

    const { password } = userObject;
    const plainToHash = await compare(password, existingUser.password);

    if (!plainToHash) {
      throw new HttpException('Password does not match', 403);
    }

    return this.getToken(existingUser);
  }

  async getToken(user): Promise<ResponseUserDto> {
    const secretKey = process.env.JWT_SECRET;

    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const payload = { id: user._id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: accessTokenOptions.expiresIn,
    });

    const data = {
      email: user.email,
      role: user.role,
      token: accessToken,
    };

    return data;
  }
}
