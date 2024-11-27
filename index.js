import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";  
import adminRoutes from './Routes/User.routes.js';
import taskRoutes from './Routes/Task.routes.js';
dotenv.config();
const app = express();

app.use(cors());  
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/tasks', taskRoutes);
const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  
  }
};

app.listen(8000, () => {
  console.log("Server is running on port 8000");
  connectDB();
});
