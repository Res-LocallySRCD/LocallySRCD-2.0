const dbHandler = require('./db-handler.js');
const ClosedStore = require('../server/models/closedStoreModel.js');
const User = require('../server/models/userModel.js');

// Connect to a new in-memory database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('models unit tests', () => {
  describe('ClosedStore model unit tests', () => {    
    it('a valid store should be created in the database', async (done) => {
      const mockValidStore = {
        storeId: 'thisIsATestIdNotRealId'
      }

      await ClosedStore.create(mockValidStore);
      const results = await ClosedStore.find({ storeId: 'thisIsATestIdNotRealId' });
      expect(results).toHaveLength(1);
      expect(results[0].storeId).toBe('thisIsATestIdNotRealId');
      done();
    });
  });

  describe('User model unit tests', () => {
    it('a valid user should be created in the database', async (done) => {
      const mockValidUser = {
        username: 'Cat',
        password: 'Snake',
        prefLocations: ['CatSnake'],
      }

      await User.create(mockValidUser);
      const results = await User.find({});
      expect(results).toHaveLength(1);
      expect(results[0].username).toBe('Cat');
      expect(results[0]).toHaveProperty('password'); // password is bcrypted
      expect(results[0].prefLocations).toEqual(expect.arrayContaining(['CatSnake']));
      done();
    });
  });
});
