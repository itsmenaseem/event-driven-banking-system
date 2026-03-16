import {NextFunction, Request,Response} from "express"
import { CustomError } from "../errors/custom.error"

export function errorMiddleware(error:unknown , req:Request , res:Response , next:NextFunction){
    if(error instanceof CustomError){
        return res.status(error.statusCode).send({errors:error.serialize()});
    }
    return res.status(500).send({errors:"Something went wrong"});
}