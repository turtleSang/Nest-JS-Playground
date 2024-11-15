import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Configs } from "./configs.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        Configs,
        TypeOrmModule.forRootAsync({
            imports: [Configs],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
                return {
                    type: 'mysql',
                    database: configService.get<string>('DATABASE'),
                    host: configService.get<string>('HOST'),
                    port: configService.get<number>('PORT'),
                    username: 'root',
                    password: configService.get<string>('PASSWORD'),
                    synchronize: configService.get<boolean>('SYNC'),
                    autoLoadEntities: true
                }
            },
            inject: [ConfigService]
        }),
    ],
    exports: [TypeOrmModule]
})
export class TypeOrmConfig { }