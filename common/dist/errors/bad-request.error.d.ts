import { CustomError } from "./custom.error";
export declare class BadRequestError extends CustomError {
    statusCode: number;
    constructor(message: string);
    serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=bad-request.error.d.ts.map