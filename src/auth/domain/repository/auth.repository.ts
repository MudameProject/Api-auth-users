import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../commons/domain/repository/user.repository';
import { UserMongooseRepository } from '../../../commons/domain/repository/user.mg.repository';
import { IAuthRepository } from './auth.interface';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from 'src/commons/domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(UserMongooseRepository)
    private readonly userRepository: UserRepository,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
  async create(userDto: UserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: userDto.email })
      .exec();
    if (existingUser) {
      console.log(userDto);

      throw new HttpException(
        `User with email ${userDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }
}
