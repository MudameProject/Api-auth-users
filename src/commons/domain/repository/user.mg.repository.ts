import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from './user.repository';

@Injectable()
export class UserMongooseRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
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
