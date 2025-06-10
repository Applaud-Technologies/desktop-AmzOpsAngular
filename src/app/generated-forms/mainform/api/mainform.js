
const express = require('express');
const router = express.Router();
const sql = require('mssql');

// List
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT 1 AS dummy;`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create
router.post('/', async (req, res) => {
  const {  } = req.body;
  try {
    await sql.query`
      
    `;
    res.status(201).send('Created');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
