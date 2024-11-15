import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "src/auth/dto/create-user.dto";

export class ValidateUserPipe implements PipeTransform {
    async transform(value: any, argumentMetadata: ArgumentMetadata) {
        const { password, username } = value;
        if (!this.checkPassword(password) || !password) {
            throw new BadRequestException('Mật khẩu không đúng định dạng');
        }
        if (!this.checkUsername(username) || !username) {
            throw new BadRequestException('Username không đúng định dạng');
        }
        const obj = plainToClass(CreateUserDto, value);
        const err = await validate(obj);
        if (err.length > 0) {
            throw new BadRequestException('Không đúng định dạng ');
        }
        return value;
    }

    checkPassword(password: string): boolean {
        const regex: RegExp = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        return regex.test(password);
    }

    checkUsername(username: string): boolean {
        const regex: RegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
        return regex.test(username);
    }


}