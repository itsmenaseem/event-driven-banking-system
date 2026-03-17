"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListener = void 0;
const subjects_type_1 = require("./types/subjects.type");
const nats_1 = require("nats");
const sc = (0, nats_1.StringCodec)();
async function sendDataToDLQ(js, payload, subject) {
    try {
        await js.publish(subject, sc.encode(JSON.stringify(payload)));
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
class BaseListener {
    js;
    constructor(js) {
        this.js = js;
    }
    async listen() {
        const consumer = await this.js.consumers.get(this.stream, this.consumer);
        const messages = await consumer.consume();
        for await (let message of messages) {
            let parsedData;
            // parse message data into json
            try {
                parsedData = JSON.parse(sc.decode(message.data));
            }
            catch (err) {
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
                const isSent = await sendDataToDLQ(this.js, payload, subjects_type_1.Subjects.Corrupt);
                if (isSent)
                    message.ack();
                continue;
            }
            // consume message 
            try {
                await this.onMessage(parsedData);
                message.ack();
            }
            catch (err) {
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
                    const isSent = await sendDataToDLQ(this.js, payload, subjects_type_1.Subjects.Failed);
                    if (isSent)
                        message.ack();
                }
            }
        }
    }
}
exports.BaseListener = BaseListener;
//# sourceMappingURL=base-listener.js.map