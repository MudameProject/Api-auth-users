import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../../commons/domain/dto/user.dto';
import { ServiceUser } from '../../app/user.service';
import { IUserService } from 'src/user/app/user.serivce.interface';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject(ServiceUser) private readonly userService: IUserService,
  ) {}

  @Post('create')
  create(@Body() createUserDto: UserDto) {
    return this.userService.creates(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
