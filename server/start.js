const app = require('./server.js');
const dbHandler = require('./db-handler.js');
const PORT = 3000; // this is your port 👈

dbHandler.connect();

app.listen(PORT, () => {
  console.log(`Server listening on port: 🐼 ${PORT} 🐼`);
});
