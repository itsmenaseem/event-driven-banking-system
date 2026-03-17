
import { JetStreamClient,StringCodec} from "nats";
import { Subjects } from "./types/subjects.type";

interface Event{
    subject:Subjects;
    data:any;
}
const sc = StringCodec();
export abstract class BasePublisher<T extends Event>{
    abstract subject:T["subject"];

    constructor(private js:JetStreamClient){}
    async publish(data:T["data"]){
        try {
            await this.js.publish(this.subject,sc.encode(JSON.stringify(data)));
        } catch (error) {
            console.error(error);
        }
    }
}