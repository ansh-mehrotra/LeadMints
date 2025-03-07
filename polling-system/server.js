import express from "express"; // Corrected import
import pool from "./db.js"; // Import default `pool` instance
import { Kafka } from "kafkajs";

const app = express();
app.use(express.json()); // Corrected middleware import

const kafka = new Kafka({ clientId: "polling-app", brokers: ["localhost:9092"] });
const producer = kafka.producer();

(async () => { await producer.connect(); })();

app.post("/polls", async (req, res) => {
  try {
    const { question, options } = req.body;
    const result = await pool.query("INSERT INTO polls (question) VALUES ($1) RETURNING id", [question]); // Fixed: `pool.query`
    const pollId = result.rows[0].id;

    for (const option of options) {
      await pool.query("INSERT INTO options (poll_id, option_text) VALUES ($1, $2)", [pollId, option]); // Fixed: `pool.query`
    }

    res.json({ pollId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/polls/:id/vote", async (req, res) => {
  try {
    const { optionId } = req.body;
    await producer.send({ topic: "votes", messages: [{ value: JSON.stringify({ optionId }) }] });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/polls/:id", async (req, res) => {
  try {
    const poll = await pool.query("SELECT * FROM options WHERE poll_id = $1", [req.params.id]); // Fixed: `pool.query`
    res.json(poll.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
