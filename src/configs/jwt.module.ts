import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { Configs } from "./configs.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [JwtModule.registerAsync({
        imports: [Configs],
        inject: [ConfigService],
        useFactory: (configsService: ConfigService) => {
            return {
                global: true,
                secret: configsService.get<string>('JWT_SECRET'),
                signOptions: { algorithm: 'HS384', expiresIn: '3d' },
            }
        }

    },)],
    exports: [JwtModule]
})
export class JwTConfigs { }