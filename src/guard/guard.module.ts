import { CanActivate, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwTConfigs } from "src/configs/jwt.module";
import { AuthGuard } from "./guard";

@Module({
    imports: [JwTConfigs],
    providers: [{
        provide: APP_GUARD,
        useClass: AuthGuard
    }]
})
export class GuardModule {

}