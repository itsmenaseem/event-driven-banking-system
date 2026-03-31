import { Consumers, Streams } from "@banking-event/common";
import { AckPolicy, connect } from "nats";

async function init() {
    const nc = await connect({ servers: "nats://nats-srv:4222" });
    const jsm = await nc.jetstreamManager();

    // ACCOUNT stream
    try {
        await jsm.streams.add({
            name: Streams.ACCOUNT,
            subjects: ["account.created"]
        });
        console.log("✅ ACCOUNT stream created");
    } catch {
        console.log("⚠️ ACCOUNT stream already exists");
    }

    // TRANSACTION stream
    try {
        await jsm.streams.add({
            name: Streams.TRANSACTION,
            subjects: ["transaction.created"]
        });
        console.log("✅ TRANSACTION stream created");
    } catch {
        console.log("⚠️ TRANSACTION stream already exists");
    }

    // ACCOUNT consumer
    try {
        await jsm.consumers.add(Streams.ACCOUNT, {
            durable_name: Consumers.Account,
            ack_policy: AckPolicy.Explicit
        });
        console.log("✅ ACCOUNT consumer created");
    } catch {
        console.log("⚠️ ACCOUNT consumer exists");
    }

    // TRANSACTION consumer
    try {
        await jsm.consumers.add(Streams.TRANSACTION, {
            durable_name: Consumers.Transaction,
            ack_policy: AckPolicy.Explicit
        });
        console.log("✅ TRANSACTION consumer created");
    } catch {
        console.log("⚠️ TRANSACTION consumer exists");
    }

    await nc.drain();
}

init();