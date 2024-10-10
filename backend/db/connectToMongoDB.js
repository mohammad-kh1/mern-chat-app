import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Conntected to MongoDB successfully! :)");
    } catch (error) {
        console.error(error.message);
    }
};


export default connectToMongoDB;