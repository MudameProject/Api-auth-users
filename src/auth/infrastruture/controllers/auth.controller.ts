import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../domain/services/auth.service';
import {
  registerUserDto,
  loginUserDto,
} from '../../domain/dto/request-user.dto';
import { User } from 'src/commons/domain/entities/user.entity';
import { IAuthService } from 'src/auth/domain/services/auth.service.interface';

@ApiTags('autentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: IAuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userObject: registerUserDto): Promise<User> {
    console.log(userObject);

    return await this.authService.register(userObject);
  }

  @Post('login')
  async loginUser(@Body() userObject: loginUserDto) {
    return await this.authService.login(userObject);
  }
}
