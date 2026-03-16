import { CustomError } from "./custom.error";
import { ValidationError } from "express-validator"

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(private errors: ValidationError[]) {
        super("Invalid  provided input!!")
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        const res = this.errors.map((error: ValidationError) => {
            if (error.type === "field") {
                return {
                    message: error.msg,
                    field: error.path,
                };
            }

            return {
                message: error.msg,
            };
        })
        return res;
    }
}