import { BadRequestException, ForbiddenException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { BlackList } from './entities/blacklist.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(BlackList)
    private blackListRepository: Repository<BlackList>,
    private jwt: JwtService,
  ) { }

  async signUp({ password, username }: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOneBy({ username });
    if (user) {
      throw new Error('Tên đăng nhập đã tồn tại')
    }
    const salt = bcrypt.genSaltSync();
    const hashPassword = await bcrypt.hash(password, salt);
    return await this.userRepository.save({ username, password: hashPassword });
  }

  async signIn(userLogin: CreateUserDto): Promise<string> {
    let { password, username } = userLogin;
    let user = await this.userRepository.findOneBy({ username: username });
    let check: boolean = await bcrypt.compare(password, user.password);
    if (check) {
      let payloadUser = { id: user.id, username: user.username };
      const jwt = await this.jwt.signAsync(payloadUser);
      return `Bearer ${jwt}`;
    } else {
      throw new Error('Sai Mật Khẩu')
    }
  }

  async signOut(token: string) {
    try {
      let payload = await this.jwt.verify(token);
      console.log(payload);

      let createAt = new Date();
      let expireAt = new Date(payload.exp * 1000);
      await this.blackListRepository.save({ createAt, expireAt, token })
      return 'Token đã bị hủy';
    } catch (error) {
      throw new Error('Không xác thực')
    }
  }



}
