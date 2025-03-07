// // websocket.js
// import { Server } from "ws";
// import pool from "./db.js";

// const wss = new Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   ws.on("message", async (pollId) => {
//     const results = await pool.query("SELECT * FROM options WHERE poll_id = $1", [pollId]);
//     ws.send(JSON.stringify(results.rows));
//   });
// });


import {WebSocketServer} from "ws"; // Import `ws` as a default module

const wss = new WebSocketServer({ port: 8080 }); // ✅ Corrected WebSocket Server instantiation

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    try {
      const pollId = message.toString().trim(); // Ensure message is a valid string
      console.log(`Received poll ID: ${pollId}`);

      ws.send(`You sent: ${pollId}`);
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
      ws.send(JSON.stringify({ error: "Invalid request format" }));
    }
  });

  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server running on ws://localhost:8080");

