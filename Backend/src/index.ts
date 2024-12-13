import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocket, WebSocketServer } from "ws";
import { FullMatchInfo } from "./lib/types";
import { createServer } from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.post("/", (req, res) => {
  try {
    const matchInfo: FullMatchInfo = req.body;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(matchInfo));
      }
    });

    res.status(200).json({ message: "Match sent successfully" });
  } catch (error) {
    console.error("Error processing match info:", error);
    res.status(500).json({ message: "Error processing match info" });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
