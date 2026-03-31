import { app } from "./app";
import "dotenv/config";
import { PortConfig } from "./configs/port.config";
import { dbConnect, dbDisconnect } from "./wrappers/db.wrapper";
import { Server } from "node:http";
import { NatsWrapper } from "./wrappers/nats.wrapper";
import { natsConfig } from "./configs/nats.config";

async function runServer() {
    const PORT = PortConfig.PORT;
    let server: Server | undefined;

    const gracefulShutdown = async (exitCode = 0) => {
        console.log("Shutting down server...");
        try {
            if (server) {
                await new Promise<void>((resolve, reject) => {
                    server!.close(err => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
                console.log("Server closed");
            }
        } catch (err) {
            console.error("Error closing server:", err);
        }

        try {
            await dbDisconnect();
        } catch (err) {
            console.error("Error disconnecting DB:", err);
        }

        process.exit(exitCode);
    };

    process.on("unhandledRejection", async (reason) => {
        console.error("Unhandled Promise Rejection:", reason);
        await gracefulShutdown(1);
    });

    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
        // why not here  => await gracefulShutdown(1);
        process.exit(1);
    });

    process.on("SIGTERM", () => gracefulShutdown(0));
    process.on("SIGINT", () => gracefulShutdown(0));

    try {
        const url = natsConfig.server
        // await dbConnect();
        await NatsWrapper.connect(url!);
        server = app.listen(PORT, () => {
            console.log(`Server listening on PORT: ${PORT}`);
        });

        server.on("error", async (err) => {
            console.error("Server startup failed:", err);
            await gracefulShutdown(1);
        });

    } catch (err) {
        console.error("Failed to start server:", err);
        await gracefulShutdown(1);
    }
}

runServer();