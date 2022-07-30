const http = require('http');
require('./src/database');
require('./src/templates');

const port = 3000;

const app = require('./src/app');

app.listen(port, () => {
  console.log(`We are listening on port ${port}`);
});
