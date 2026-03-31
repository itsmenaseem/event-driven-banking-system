
import { Subjects } from "./subjects.type";


export interface AccountWithdrawnEvent {
    subject:Subjects.AccountWithdrawn,
    data:{
        accountId:string,
        amount:number
    }
}