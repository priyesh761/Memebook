const app = require('../app');
const { ErrorResponse } = require('../model');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');
var db = mongoose.connection;
const TestData = JSON.parse(fs.readFileSync(`${__dirname}/testData.json`, { encoding: 'utf8', flag: 'r' }));

jest.setTimeout(60000);
describe('Authentication Controller', () => {

  test('RegisterUser-Fail-UserAlreadyExist', done => {

    db.once('open', async () => {

      const response = await request(app)
        .post('/register')
        .send(TestData.RegisterUserData);
      expect(response.status).toEqual(409);
      expect(response.body.message).toBeDefined();
      done();
    });
  });

  test('Login User', done => {
    db.once('open', async () => {

      const response = await request(app)
        .post('/login')
        .send(TestData.LoginUserData);
      const cookies = cookieParser.JSONCookie(response.header);
      expect(response.status).toEqual(200);
      expect(cookies.token).toBeDefined();
      done();
    });
  })


});