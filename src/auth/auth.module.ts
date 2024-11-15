import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Configs } from 'src/configs/configs.module';
import { Blog } from 'src/blog/entities/blog.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwTConfigs } from 'src/configs/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog]), Configs, JwTConfigs],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
