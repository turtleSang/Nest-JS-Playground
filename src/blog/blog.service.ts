import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
    ) { }

    async create(newBlog: CreateBlogDto) {
        return await this.blogRepository.save({ ...newBlog });
    }

    async getAll() {
        return await this.blogRepository.find();
    }

    async getOne(id: number) {
        return await this.blogRepository.findOneBy({ id })
    }
}
