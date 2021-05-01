require('dotenv').config();

const { PORT } = require('./config/vars');
const app = require('./config/express');

app.listen(PORT, () => {
  console.log(`Server runnning at http://localhost:${PORT}`);
});

module.exports = app;
