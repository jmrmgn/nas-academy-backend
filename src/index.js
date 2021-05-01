require('dotenv').config();

const { PORT } = require('./config/vars');
const app = require('./config/express');

app.get('/', (req, res) => {
  res.send('Hello World from NAS ACADEMY!');
});

app.listen(PORT, () => {
  console.log(`Server runnning at http://localhost:${PORT}`);
});

module.exports = app;
