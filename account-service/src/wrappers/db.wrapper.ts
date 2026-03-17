import mongoose from "mongoose";
import { dbConfigs } from "../configs/db.config";


export async function dbConnect(){
    try {
        const url = dbConfigs.url;
        const connection = await mongoose.connect(url!);
        console.log(`connected to database at host: ${connection.connection.host}`);
    } catch (error) {
        let message = "Failed to connect to database";
        if(error instanceof Error)message = error.message;
        throw new Error(message);
    }
}

export async function dbDisconnect(){
     await mongoose.disconnect();
    console.log("MongoDB disconnected");
}

