"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom.error");
class BadRequestError extends custom_error_1.CustomError {
    statusCode = 400;
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize() {
        return [{ message: this.message }];
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request.error.js.map