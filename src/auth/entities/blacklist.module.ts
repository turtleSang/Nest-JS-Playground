import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlackList } from "./blacklist.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BlackList])],
    exports: [TypeOrmModule]
})
export class BlackListModule { }
