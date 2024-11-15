import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req = context.switchToHttp().getRequest<Request>();
        let token = this.extractToken(req);
        console.log(token);

        if (!token) {
            throw new UnauthorizedException('Chưa đăng nhập');
        }
        try {
            const payload = await this.jwtService.verify(token);
            req[payload]
        } catch (err) {
            throw new UnauthorizedException(err)
        }
        return true;
    }

    extractToken(req: Request): string | undefined {
        let [type, token] = req.headers.token?.toString().split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}



