import mongoose from "mongoose";
import "dotenv/config";
export const setupDbConnection = () => {
    const connectionUrl = process.env.MONGODB_URL + "anchorDB";
    mongoose.connect(connectionUrl);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
};
//# sourceMappingURL=mongoose.js.map