const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://database1_nutscream:c03153352fb071877f7676ddb1a7951488337b55@4h7.h.filess.io:5433/database1_nutscream"
});

// Middleware
app.use(cors());

// Route to get all data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM my_schema.table1');
    // Convert array of objects to a string representation
    const dataString = result.rows.map(row => JSON.stringify(row)).join('\n');
    res.send(dataString); // Send string response
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).send('Internal Server Error'); // Send string error response
  }
});

// Route to get data by username
app.get('/api/data/:username', async (req, res) => {
  const { username } = req.params; // Extract username from request parameters
  try {
    const result = await pool.query('SELECT username FROM my_schema.table1 WHERE username = $1', [username]);
    // Convert array of objects to a string representation
    //const dataString = result.rows.map(row => JSON.stringify(row)).join('\n');
    const dataString = result.rows.map(row => JSON.stringify(row)).join('\n');
    console.log("Hasilnya")
    console.log(dataString)
    res.send(dataString); // Send string response
  } catch (error) {
    console.error(`Error fetching data for username ${username}:`, error);
    res.status(500).send('Internal Server Error'); // Send string error response
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
