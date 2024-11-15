import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { JwTConfigs } from 'src/configs/jwt.module';



@Module({
  imports: [TypeOrmModule.forFeature([User, Blog]), JwTConfigs],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
