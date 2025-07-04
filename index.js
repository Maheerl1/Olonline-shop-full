import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import groupRoutes from "./routes/groupbuy.js";
import paymentRoutes from "./routes/payment.js";
import subRoutes from "./routes/subaccount.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// attach io to req
app.use((req, _res, next) => { req.io = io; next(); });

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/pay", paymentRoutes);
app.use("/api/subaccount", subRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
