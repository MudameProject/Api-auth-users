import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserMongooseRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  findByUsername(userName: string): Promise<User> {
    return this.userModel.findOne({ userName }).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(newUserDto: UserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: newUserDto.email })
      .exec();
    if (existingUser) {
      throw new HttpException(
        `User with email ${newUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.userModel(newUserDto);
    return createdUser.save();
  }
}
