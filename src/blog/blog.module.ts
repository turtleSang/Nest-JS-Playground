import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from 'src/auth/entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Blog, User])],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService, TypeOrmModule]
})
export class BlogModule { }
