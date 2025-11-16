import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import "./config/db.js";          // ensure tables exist
import apiRoutes from "./routes/api.js";
import ingestRoutes from "./routes/ingest.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api", apiRoutes);
app.use("/", ingestRoutes);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`🚀 FinGenie (mock email) running on http://localhost:${PORT}`);
  console.log(`• POST /demo/ingest   → load sample emails`);
  console.log(`• GET  /api/bills     → list parsed bills`);
  console.log(`• GET  /api/summary/week`);
  console.log(`• GET  /api/recommendations`);
});

// Optional: live updates to Lovable via WS (emit when you want)
export const wss = new WebSocketServer({ server });
wss.on("connection", () => console.log("🔌 Lovable connected (WebSocket)"));
