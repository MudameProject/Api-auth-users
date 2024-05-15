import { UserDto } from '../../commons/domain/dto/user.dto';

export interface IUserService {
  creates(newUser: UserDto): Promise<IResponse>;
}

export interface IResponse {
  message: string;
  code: number;
}
