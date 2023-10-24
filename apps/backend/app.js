const express = require('express');
const app = express();
const port = 5000; // Choose your desired port number

app.get('/api/resource', (req, res) => {
    // Your logic to retrieve data
    const data = { key: 'value' };
    res.json(data); // Send JSON response
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });