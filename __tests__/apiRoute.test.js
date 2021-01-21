const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

const dbHandler = require('../server/db-handler.js');

// Connect to a new in-memory database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('api route integration', () => {
  const mockBody = {
    latitude: 40.7505989074707,
    longitude: -73.99359893798828,
    storeId: 'thisIsATestIdNotRealId',
    term: 'pizza'
  };

  describe('POST to /', () => {
    it('responds with 200 status and text/html content type', async (done) => {
      const res = await request.post('/api').send(mockBody);
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('results');
      expect(res.body.term).toBe(mockBody.term);
      expect(res.body).toHaveProperty('closedStoreList');
      done();
    });
  });

  describe('POST to /report', () => {
    it('responds with 200 status and has closedStoreId on body of response that equals mockBody storeId', async (done) => {
      const res = await request.post('/api/report').send(mockBody);

      expect(res.status).toBe(200);
      expect(res.body.closedStoreId).toBe(mockBody.storeId);
      done();
    });
  });

  // tests to see if a get request to /api/test works
  // xdescribe('testing /api/test', () => {
  //   it('get responds with 200 status', async (done) => {
  //     const res = await request.get('/api/test')
      
  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe('Passed');

  //     done();
  //   })
  // });

  // tests to see if a post request to /api/testing works
  // xdescribe('testing /api/testing', () => {
  //   it('post responds with 200 status', async (done) => {
  //     const mockBody = {
  //       latitude: 40.7505989074707,
  //       longitude: -73.99359893798828,
  //       storeId: 'thisIsATestIdNotRealId',
  //       term: 'pizza'
  //     };

  //     const res = await request.post('/api/testing').send(mockBody);

  //     expect(res.status).toBe(200);
  //     expect(mockBody).toEqual(res.body);

  //     done();
  //   })
  // });
});
