
import { Consumers } from "./types/consumers.type";
import { Streams } from "./types/streams.type";
import { Subjects } from "./types/subjects.type";
import { JetStreamClient, JsMsg, StringCodec } from "nats"

const sc = StringCodec();

export interface Event {
    subject: Subjects
    data: any,
}


async function sendDataToDLQ(js: JetStreamClient, payload: any, subject: Subjects): Promise<boolean> {
    try {
        await js.publish(subject, sc.encode(JSON.stringify(payload)));
        return true
    } catch (error) {
        console.error(error);
        return false;
    }
}

export abstract class BaseListener<T extends Event> {
    abstract subject: T["subject"];
    abstract stream: Streams;
    abstract consumer: Consumers;
    constructor(private js: JetStreamClient) { }
    abstract onMessage(data: T["data"]): Promise<void>;
    async listen() {
        const consumer = await this.js.consumers.get(
            this.stream,
            this.consumer
        );

        const messages = await consumer.consume();

        for await (let message of messages) {
            let parsedData: T["data"];
            // parse message data into json
            try {
                parsedData = JSON.parse(sc.decode(message.data));
            } catch (err) {
                console.error(err);
                const payload = {
                    originalSubject: message.subject,
                    data: sc.decode(message.data),
                    error: err instanceof Error ? err.message : "processing error",
                    timestamp: Date.now(),
                    retries: message.info.deliveryCount,
                    stream: this.stream,
                    consumer: this.consumer
                };
                const isSent = await sendDataToDLQ(this.js, payload, Subjects.Corrupt);
                if (isSent) message.ack();
                continue;
            }
            // consume message 
            try {
                await this.onMessage(parsedData);
                message.ack();
            } catch (err) {
                console.error(err);
                const payload = {
                    originalSubject: message.subject,
                    data: sc.decode(message.data),
                    error: err instanceof Error ? err.message : "processing error",
                    timestamp: Date.now(),
                    retries: message.info.deliveryCount,
                    stream: this.stream,
                    consumer: this.consumer
                };
                if (message.info.deliveryCount >= 5) {
                    const isSent = await sendDataToDLQ(this.js, payload, Subjects.Failed);
                    if (isSent) message.ack();
                }

            }
        }
    }
}