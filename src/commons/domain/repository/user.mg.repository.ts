import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';

@Injectable()
export class UserMongooseRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: userDto.email })
      .exec();
    if (existingUser) {
      throw new HttpException(
        `User with email ${userDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }
}
