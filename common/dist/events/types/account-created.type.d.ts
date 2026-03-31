import { Subjects } from "./subjects.type";
export interface AccountCreatedEvent {
    subject: Subjects.AccountCreated;
    data: {
        accountId: string;
    };
}
//# sourceMappingURL=account-created.type.d.ts.map