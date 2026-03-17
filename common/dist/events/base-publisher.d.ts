import { JetStreamClient } from "nats";
import { Subjects } from "./types/subjects.type";
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class BasePublisher<T extends Event> {
    private js;
    abstract subject: T["subject"];
    constructor(js: JetStreamClient);
    publish(data: T["data"]): Promise<void>;
}
export {};
//# sourceMappingURL=base-publisher.d.ts.map