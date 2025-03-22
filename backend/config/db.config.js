import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.name}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default ConnectDb;