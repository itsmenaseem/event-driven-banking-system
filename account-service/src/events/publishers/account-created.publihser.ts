import { AccountCreatedEvent, BasePublisher, Subjects , } from "@banking-event/common"

export class AccountCreatedPublisher extends BasePublisher<AccountCreatedEvent> {
    subject: Subjects.AccountCreated = Subjects.AccountCreated
};