import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class DemoMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        next();
    }

}