import mongoose from "mongoose";


let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}
async function ConnectToDatabase() {

    const MONGODB_URI = process.env.MONGODB_URI!;

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment");
    }
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Could not connect to database");
    }

    return cached.conn;
}

export default ConnectToDatabase;
