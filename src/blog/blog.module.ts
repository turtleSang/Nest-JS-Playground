import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from 'src/auth/entities/user.entity';
import { JwTConfigs } from 'src/configs/jwt.module';
import { BlackListModule } from 'src/auth/entities/blacklist.module';



@Module({
    imports: [TypeOrmModule.forFeature([Blog, User]), JwTConfigs, BlackListModule],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService, TypeOrmModule]
})
export class BlogModule { }
