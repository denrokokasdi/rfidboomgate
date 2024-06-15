const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios'); // Import axios

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/database_name"
});

// Middleware
app.use(cors());

// Route to get all data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM my_schema.table1');
    res.json(result.rows); // Send JSON response
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get data by username
app.get('/api/dataa/:username', async (req, res) => {
  const { username } = req.params; // Extract username from request parameters
  try {
    const result = await pool.query('SELECT * FROM my_schema.table1 WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send JSON response of the first matching row
    } else {
      res.status(404).send('Username not found'); // Send 404 if no matching username found
    }
  } catch (error) {
    console.error(`Error fetching data for username ${username}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

// New route to request data from external API
app.get('/external-data', async (req, res) => {
  try {
    const response = await axios.get('https://rfidboomgate.com/wp-json/getuser/v1/user');
    res.json(response.data); // Send JSON response
  } catch (error) {
    console.error('Error fetching external data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
