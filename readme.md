# Polling System with Kafka, Zookeeper, WebSockets, and PostgreSQL

This project implements a real-time polling system using **Node.js, Kafka, Zookeeper, PostgreSQL, WebSockets, and Docker**. The system supports:
- **Poll Creation**
- **Voting System (Kafka Producer)**
- **Real-time Poll Updates (WebSockets)**
- **Leaderboard Feature**
- **Concurrency & Fault Tolerance (Kafka & Zookeeper)**

---

## **📌 Prerequisites**
Before running this project, ensure you have:
1. **Docker & Docker Compose** installed → [Get Docker](https://www.docker.com/get-started/)
2. **Node.js (v18+)** installed → [Download Node.js](https://nodejs.org/)
3. **PostgreSQL** installed and running → [Download PostgreSQL](https://www.postgresql.org/download/)
4. **Kafka & Zookeeper** set up via Docker

---

## **🚀 Setting Up the Project**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repository/polling-system.git
cd polling-system


## Install Dependencies

npm install

## Create a docker .env file in the root directory and add:
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=polls
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
KAFKA_BROKER=localhost:9092


## Start Kafka
docker-compose up -d

## Start Backend server
node server.js

## Start Kafka consumer
node consumer.js

## Start the WebSocket server
node websocket.js

## Start the leaderboard service
node leaderboard.js

