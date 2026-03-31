import { Subjects } from "./subjects.type";
export interface AccountTransferredEvent {
    subject: Subjects.AccountTransferred;
    data: {
        senderId: string;
        receiverId: string;
        amount: number;
    };
}
//# sourceMappingURL=account-transferred.type.d.ts.map