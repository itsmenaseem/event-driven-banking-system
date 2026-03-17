import { CustomError } from "./custom.error";
import { ValidationError } from "express-validator";
export declare class RequestValidationError extends CustomError {
    private errors;
    statusCode: number;
    constructor(errors: ValidationError[]);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=request-validation.error.d.ts.map