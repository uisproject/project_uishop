import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`);

    console.log(`Connected to ${conn.connection.host}`);
  } catch (e) {
    console.error(e.message);
  }
};

export default connectDB;
