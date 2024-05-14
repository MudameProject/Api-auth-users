import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../domain/services/auth.service';
import {
  registerUserDto,
  loginUserDto,
} from '../../domain/dto/request-user.dto';
import { UserDto } from 'src/commons/domain/dto/user.dto';
import { User } from 'src/commons/domain/entities/user.entity';

@ApiTags('autentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userObject: registerUserDto): Promise<User> {
    console.log(userObject);

    return await this.authService.registerUser(userObject);
  }

  @Post('login')
  loginUser(@Body() userObject: loginUserDto) {
    console.log({ body: userObject });
  }
}
