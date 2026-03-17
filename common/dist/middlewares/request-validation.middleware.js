"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationMiddleware = RequestValidationMiddleware;
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../errors/request-validation.error");
function RequestValidationMiddleware(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req.body);
    if (errors.isEmpty())
        next();
    throw new request_validation_error_1.RequestValidationError(errors.array());
}
//# sourceMappingURL=request-validation.middleware.js.map