//consumer.js
import { Kafka } from "kafkajs";
import pool from "./db.js";

// const kafka = new Kafka({ clientId: "polling-app", brokers: ["localhost:9092"] });
const kafka = new Kafka({ clientId: "polling-app", brokers: ["host.docker.internal:9092"] }); 

const consumer = kafka.consumer({ groupId: "votes-group" });

const runConsumer = async () => {
  try {
    console.log("Connecting to Kafka...");
    await consumer.connect();
    console.log("Connected to Kafka ");

    await consumer.subscribe({ topic: "votes", fromBeginning: true });
    console.log("Subscribed to topic: votes");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log(`Received message: ${message.value.toString()} on topic ${topic}, partition ${partition}`);
          const { optionId } = JSON.parse(message.value.toString());

          // Validate `optionId` before updating the database
          if (!optionId) {
            console.error("Invalid message received: Missing optionId");
            return;
          }

          // Update the votes in PostgreSQL
          await pool.query("UPDATE options SET votes = votes + 1 WHERE id = $1", [optionId]);

          console.log(`Vote recorded successfully for option ID: ${optionId}`);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  }
};

// Handle graceful shutdown
const shutdown = async () => {
  console.log("Shutting down consumer...");
  await consumer.disconnect();
  console.log("Consumer disconnected.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

runConsumer();
