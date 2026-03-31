import { errorMiddleware } from "@banking-event/common";
import express, { Request, Response } from "express"
import { AccountCreatedPublisher } from "./events/publishers/account-created.publihser";
import { NatsWrapper } from "./wrappers/nats.wrapper";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/test",(req,res)=>{
    res.status(200).send("OK");
})

app.post("/create",async (req:Request,res:Response)=>{
    const accountId = "123456"
    const data = {accountId};
    await new AccountCreatedPublisher(NatsWrapper.js).publish(data);
    res.send("account created successfully !!");
})

app.use(errorMiddleware)
export {app};