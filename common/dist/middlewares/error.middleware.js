"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const custom_error_1 = require("../errors/custom.error");
function errorMiddleware(error, req, res, next) {
    if (error instanceof custom_error_1.CustomError) {
        return res.status(error.statusCode).send({ errors: error.serialize() });
    }
    return res.status(500).send({ errors: "Something went wrong" });
}
//# sourceMappingURL=error.middleware.js.map