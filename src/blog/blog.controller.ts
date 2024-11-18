import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Ip, NotFoundException, Param, ParseIntPipe, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { QueryFailedError } from 'typeorm';
import { ValidateBlogPipe } from 'src/pipes/validate.blog.pipe';
import { Blog } from './entities/blog.entity';
import { AuthGuard } from 'src/guard/guard';


@Controller('blog')
export class BlogController {

    constructor(
        private blogService: BlogService,
    ) { }

    @Post()
    @HttpCode(201)
    async create(@Body(new ValidateBlogPipe(true)) newBlog: CreateBlogDto) {
        try {
            return await this.blogService.create(newBlog);

        } catch (err) {
            let typeErr = (err as QueryFailedError);
            throw new BadRequestException(typeErr.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('all')
    @HttpCode(200)
    async getAll() {
        try {
            let listBlog: Blog[] = await this.blogService.getAll();
            return listBlog;
        } catch (error) {
            throw new NotFoundException('Không có danh sách');
        }

    }

    @Get(':id')
    @HttpCode(200)
    async getOne(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        }))
        id: number
    ) {
        try {

            return await this.blogService.getOne(id);
        } catch (error) {
            throw new NotFoundException('Không tìm thấy')
        }
    }
}
