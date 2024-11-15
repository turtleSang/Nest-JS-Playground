import { IsString } from "class-validator";

export class CreateBlogDto {
    @IsString()
    title: string;
    @IsString()
    summary: string;
    @IsString()
    content: string;
}