import { Consumers } from "./types/consumers.type";
import { Streams } from "./types/streams.type";
import { Subjects } from "./types/subjects.type";
import { JetStreamClient } from "nats";
export interface Event {
    stream: Streams;
    consumer: Consumers;
    subject: Subjects;
    data: any;
}
export declare abstract class BaseListener<T extends Event> {
    private js;
    abstract subject: T["subject"];
    abstract stream: T["stream"];
    abstract consumer: T["consumer"];
    constructor(js: JetStreamClient);
    abstract onMessage(data: T["data"]): Promise<void>;
    listen(): Promise<void>;
}
//# sourceMappingURL=base-listener.d.ts.map