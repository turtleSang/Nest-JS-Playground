import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development'],
            isGlobal: false
        })
    ],
    exports: [ConfigModule]
})
export class Configs { }