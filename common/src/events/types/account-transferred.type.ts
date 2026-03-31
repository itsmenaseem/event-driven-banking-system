import { Subjects } from "./subjects.type";

export interface AccountTransferredEvent {
    subject:Subjects.AccountTransferred,
    data:{
        senderId:string,
        receiverId:string,
        amount:number
    }
};