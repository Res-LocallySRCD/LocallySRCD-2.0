const dbHandler = require('../server/db-handler.js');
const User = require('../server/models/userModel.js');
const userController = require('../server/controllers/userController.js');

// Connect to a new in-memory database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

xdescribe('userController unit tests', () => {
  it('userController.createUser should...', async (done) => {

    done();
  });

  it('userController.getUser should...', async (done) => {

    done();
  });

  it('userController.getGoogleUser should...', async (done) => {

    done();
  });

  it('userController.updateUser should...', async (done) => {

    done();
  });
});
