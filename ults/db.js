import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;