

import {NextFunction, Request,Response} from "express"
import { validationResult } from "express-validator"
import { RequestValidationError } from "../errors/request-validation.error";

export function RequestValidationMiddleware(req:Request , res:Response , next:NextFunction){
    const errors = validationResult(req.body);
    if(errors.isEmpty())next();
    throw new RequestValidationError(errors.array());
}