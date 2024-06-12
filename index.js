const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://database1_nutscream:c03153352fb071877f7676ddb1a7951488337b55@4h7.h.filess.io:5433/database1_nutscream"
});

// Enable CORS for all routes
app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM my_schema.table1'); // Replace 'your_table' with your actual table name
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
