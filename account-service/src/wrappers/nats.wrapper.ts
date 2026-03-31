import {connect, JetStreamClient, JetStreamManager, NatsConnection} from "nats"


class NatsClinet {
    private _client?:NatsConnection;
    private _js?:JetStreamClient;
    get client(){
        if (!this._client) {
            throw new Error("NATS not connected");
        }
        return this._client;
    }
    get js() {
        if (!this._js) {
            throw new Error("JetStream not initialized");
        }
        return this._js;
    }
    async connect(url: string) {
        this._client = await connect({ servers: url });
        this._js = this.client.jetstream();

        console.log("✅ Connected to NATS");

        // graceful shutdown
        process.on("SIGINT", async () => {
            console.log("Shutting down...");
            await this._client?.drain();
            process.exit();
        });

        process.on("SIGTERM", async () => {
            console.log("Shutting down...");
            await this._client?.drain();
            process.exit();
        });
    }
};


export const NatsWrapper = new NatsClinet();