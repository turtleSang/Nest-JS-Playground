import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { BlackList } from "src/auth/entities/blacklist.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(BlackList)
        private blacklistRepository: Repository<BlackList>
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req = context.switchToHttp().getRequest<Request>();
        let token = this.extractToken(req);
        if (!token) {
            throw new UnauthorizedException('Chưa đăng nhập');
        }

        let blackList = await this.blacklistRepository.findOneBy({ token });
        if (blackList) {
            throw new UnauthorizedException('Phiên đăng nhập đã hết hạn');
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



