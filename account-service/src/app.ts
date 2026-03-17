import { errorMiddleware } from "@banking-event/common";
import express from "express"
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/test",(req,res)=>{
    res.status(200).send("OK");
})

app.use(errorMiddleware)
export {app};