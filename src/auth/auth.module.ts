import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwTConfigs } from 'src/configs/jwt.module';
import { UserModule } from './entities/user.module';
import { BlackListModule } from './entities/blacklist.module';

@Module({
  imports: [BlackListModule, UserModule, JwTConfigs],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
