import { User } from 'src/commons/domain/entities/user.entity';
import {
  loginUserDto,
  registerUserDto,
} from '../../domain/dto/request-user.dto';
import { ResponseUserDto } from '../../domain/dto/response-user.dto';

export interface IAuthService {
  login(loginUserDto: loginUserDto): Promise<ResponseUserDto>;
  register(registerUserDto: registerUserDto): Promise<User>;
}
