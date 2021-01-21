const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

const { MongoURI } = require("./settings.js");

// console.log('process.env.NODE_ENV in db-handler:', process.env.NODE_ENV);

/**
 * Connect to mongo memory server db if testing, else connect to actual prod db
 */
module.exports.connect = async () => {
  let activeURI;
  
  if (process.env.NODE_ENV === 'test') {
    const dummyDbURI = await mongod.getUri();
    activeURI = dummyDbURI;
  } else {
    activeURI = MongoURI;
  }

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  await mongoose.connect(activeURI, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod (used only for test db)
 */
module.exports.closeDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
}

/**
 * Remove all the data for all db collections (used only for test db)
 */
module.exports.clearDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
  
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}
