const app = require('./server.js');
const dbHandler = require('./db-handler.js');
const PORT = 3000; // this is your port 👈

// start mongoDB connection
dbHandler.connect();

// start express server connection
app.listen(PORT, () => {
  console.log(`Server listening on port: 🐼 ${PORT} 🐼`);
});
