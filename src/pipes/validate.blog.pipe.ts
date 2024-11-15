import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class ValidateBlogPipe implements PipeTransform<any> {
    constructor(private skipNull: boolean) { }

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype && this.toValidate(metatype)) {
            return value
        };
        const object = plainToInstance(metatype, value);
        const err: ValidationError[] = await validate(object, { skipNullProperties: this.skipNull });
        if (err.length > 0) {
            throw new BadRequestException('Nội dung không hợp lệ', { cause: err });
        };
        return value;
    }

    toValidate(metatype: Function): boolean {
        let type: Function[] = [Number, String, Array, Object, Boolean];
        return !type.includes(metatype);
    }
}