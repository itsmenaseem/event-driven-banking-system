"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom.error");
class RequestValidationError extends custom_error_1.CustomError {
    errors;
    statusCode = 400;
    constructor(errors) {
        super("Invalid  provided input!!");
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serialize() {
        const res = this.errors.map((error) => {
            if (error.type === "field") {
                return {
                    message: error.msg,
                    field: error.path,
                };
            }
            return {
                message: error.msg,
            };
        });
        return res;
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=request-validation.error.js.map