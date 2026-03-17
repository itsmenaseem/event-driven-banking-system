"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePublisher = void 0;
const nats_1 = require("nats");
const sc = (0, nats_1.StringCodec)();
class BasePublisher {
    js;
    constructor(js) {
        this.js = js;
    }
    async publish(data) {
        try {
            await this.js.publish(this.subject, sc.encode(JSON.stringify(data)));
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.BasePublisher = BasePublisher;
//# sourceMappingURL=base-publisher.js.map