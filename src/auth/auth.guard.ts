import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class AuthGruad implements CanActivate {
    constructor() { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req = context.switchToHttp().getRequest<Request>();
        console.log(req.headers);
        throw new ForbiddenException('Chưa đăng nhập');
    }
}



