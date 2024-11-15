import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserPipe } from 'src/pipes/validate.user.pipe';
import { TypeORMError } from 'typeorm';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async signUp(@Body(new ValidateUserPipe) createUserDto: CreateUserDto) {
    try {
      let user = await this.authService.signUp(createUserDto)
      return `Người dùng ${user.username} đã tạo thành công`;
    } catch (error) {


      let err = error as TypeORMError;
      throw new BadRequestException(err.message);
    }
  }


  @Post('login')
  async signIn(@Body() userLogin: CreateUserDto) {
    try {
      let token = await this.authService.signIn(userLogin);
      return { token }

    } catch (error) {
      let userErr = error as Error;
      throw new ForbiddenException(userErr.message)
    }
  }
}
