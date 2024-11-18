import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Blog } from "src/blog/entities/blog.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Blog])],
    exports: [TypeOrmModule]
})
export class UserModule {

}