import express from "express"; 
import "dotenv/config"; 
import cors from "cors"
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import { connectDB } from "./lib/db.js";
import cookieParser  from "cookie-parser"
import path from "path"

const app = express();
const PORT = process.env.PORT || 5002;

const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // ALLOW FRONTEND TO SEND COOKIES
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World! This is Chat-Application server site page");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const httpServer = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});

httpServer.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error("❌ Server error:", err);
  }
});
