// this file contains the example for the configurations necessary for the server
// Create a new file called settings.js and copy/paste the code below and
// replace the examples with your own settings

// connection string for MongoDB. If using MongoDB Atlas, use the string given
// by clicking on your cluster -> "connect" -> "Connect your application"
// Don't forget to substitute usename, password, and cluster!!
const MongoURI =
  "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbName>?retryWrites=true&w=majority";

// Google OAuth
const clientID = "YOUR-CLIENT-ID";
const clientSecret = "YOUR-CLIENT-SECRET";

// your dabatase name inside the cluster.
const dbName = "locally-srcd";

// your name of collection that stores closed stores
const closedStores = "closedstores";

module.exports = {
  MongoURI,
  dbName,
  closedStores,
  clientID,
  clientSecret,
};
