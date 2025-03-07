import pkg from "pg"; // Import the entire `pg` package as default
const { Pool } = pkg; // Destructure `Pool` from the package

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "polls",
  password: "yourpassword", // Replace with your actual password
  port: 5432,
});

export default pool; // Correctly export `pool`
