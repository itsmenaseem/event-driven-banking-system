export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract serialize(): {
        message: string;
        field?: string;
    }[];
}
//# sourceMappingURL=custom.error.d.ts.map