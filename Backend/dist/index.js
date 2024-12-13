"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = require("ws");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Create WebSocket server
const wss = new ws_1.WebSocketServer({ port: 4001 });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
app.post("/", (req, res) => {
    try {
        const matchInfo = req.body;
        console.log(matchInfo);
        // Broadcast to all connected WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify(matchInfo));
            }
        });
        res.status(200).json({ message: "Match sent successfully" });
    }
    catch (error) {
        console.error("Error processing match info:", error);
        res.status(500).json({ message: "Error processing match info" });
    }
});
// WebSocket connection handler
wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
