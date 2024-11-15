import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class DemoExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let req = ctx.getRequest<Request>();
        let res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const mess = exception.getResponse();
        res.status(status).json({
            mess,
            date: new Date(),
            path: req.url
        })

    }

}