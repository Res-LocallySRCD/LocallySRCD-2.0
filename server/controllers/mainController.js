const path = require("path");
const yelp = require("yelp-fusion");
const client = yelp.client("C875dNRjWAzLaQgmC7nd_wO97JFWpg6PuDdI9mfVsru_cOTvyoouijdnEAQwW2rnVUJ5lELwswChXgQaOJpSNpLK4tK6Jr_Gi1xRtp3dWA2UZT7B7xYP5zDBmEYDYHYx");
const ClosedStores = require("../models/closedStoreModel.js");

const mainController = {};

mainController.getClosedStores = async (req, res, next) => {
  try {
    const closedStores = await ClosedStores.find({});
    const closedStoreIdCache = {};
    // this is an arr of objs which has closed store id's
    for (let obj of closedStores) {
      let innerId = obj.storeId;
      // the actual id values are the keys, bools are the vals
      closedStoreIdCache[innerId] = true;
    }
    // console.log('closedStoreIdCache in mainController.getClosedStores:', closedStoreIdCache);
    res.locals.closedStoresList = closedStoreIdCache;
    return next();
  } catch(err) {
    return next({
      log: "Error in mainController.getClosedStores",
      // status: 400,
      message: { err: "ERROR: Unable to get closed stores" }
    })
  }
};

mainController.getResults = async (req, res, next) => {
  try {
    const { term, longitude, latitude } = req.body;
    const response = await client.search({
      term: term,
      latitude: latitude,
      longitude: longitude,
    })
    // take response object's array of businesses and reduce it down to 10 results
    // while removing unneeded key-value pairs
    let counter = 0;
    const reducedResults = response.jsonBody.businesses.reduce((acc, cv, idx) => {
      // checking if the results arr of obj's id matches the closed store's arr of obj's id
      if (res.locals.closedStoresList.hasOwnProperty(cv.id)) {
        counter++;
        return acc;
      }
      // delete irrelevant key val pairs from yelp's API response
      if (idx < 10 + counter) {
        delete cv.alias;
        delete cv.is_closed;
        delete cv.transactions;
        delete cv.price;
        acc.push(cv);
      }
      return acc;
    }, []);
    res.locals.results = reducedResults;
    res.locals.term = term;
    return next();
  } catch(err) {
    return next({
      log: "Error in mainController.getResults",
      // status: 400,
      message: { err: "ERROR: Unable to show results" }
    })
  }
};

mainController.reportClosed = async (req, res, next) => {
  try {
    const { storeId: reqStoreId } = req.body;
    const newClosedStore = await ClosedStores.create({ storeId: reqStoreId });
    const { storeId: closedStoreId } = newClosedStore;
    res.locals.closedStoreId = closedStoreId;
    return next();
  } catch(err) {
    return next({
      log: "Error in mainController.reportClosed: store might already be marked as closed",
      // status: 400,
      message: { err: "ERROR: Unable to report store as closed" }
    })
  }
};

module.exports = mainController;