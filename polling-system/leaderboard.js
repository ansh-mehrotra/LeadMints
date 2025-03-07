// leaderboard.js
import express, { json } from "express";
import pool from "./db.js";

const app = express();
app.use(json());

app.get("/leaderboard", async (req, res) => {
  const result = await pool.query("SELECT option_text, votes FROM options ORDER BY votes DESC LIMIT 5");
  res.json(result.rows);
});

app.listen(4000, () => console.log("Leaderboard running on port 4000"));
