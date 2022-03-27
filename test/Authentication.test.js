require('dotenv').config();
process.env.NODE_ENV = "Test";
const app = require('../app');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');
const TestData = JSON.parse(fs.readFileSync(`${__dirname}/testData.json`, { encoding: 'utf8', flag: 'r' }));
var db = mongoose.connection;
var cookies;

const parseCookie = str => {
  var obj = {};
  str
    .split(';')
    .map(v => v.split('='))
    .forEach(v => obj[decodeURIComponent(v[0].trim())] = (v[1] ? decodeURIComponent(v[1].trim()) : null));
  return obj;
}

jest.setTimeout(30000);
describe('Authentication Controller', () => {
  beforeAll(done => { db.once('open', () => { done(); }); });

  test('LoginUser-Pass', async () => {

    const response = await request(app)
      .post('/login')
      .send(TestData.LoginUserData);

    expect(response.status).toEqual(200);
    cookies = response.header["set-cookie"]
    const cookieObject = parseCookie(cookies[0]);
    expect(cookieObject.token).toBeDefined();
  })

  test('LoginUser-Fail-InvalidCredentials', async () => {

    const response = await request(app)
      .post('/login')
      .send(TestData.InvalidLoginUserData);

    expect(response.status).toEqual(401);
    expect(response.body.message).toBeDefined();
  });

  test('DeleteUser-Pass', async () => {

    const response = await request(app)
      .delete('/delete')
      .set('Cookie', cookies)
    expect(response.status).toEqual(200);
    expect(response.body.message).toBeDefined();
  });

  test('DeleteUser-Fail-UnauthorizedNoToken', async () => {

    const response = await request(app)
      .delete('/delete')
    expect(response.status).toEqual(401);
    expect(response.body.message).toBeDefined();
  });

  test('DeleteUser-Fail-UnauthorizedInvalidToken', async () => {
    const response = await request(app)
      .delete('/delete')
      .set('Cookie', TestData.ExpiredTokenCookie)
    expect(response.status).toEqual(401);
    expect(response.body.message).toBeDefined();
  });

  test('RegisterUser-Pass', async () => {

    const response = await request(app)
      .post('/register')
      .send(TestData.RegisterUserData);
    expect(response.status).toEqual(201);
    expect(response.body.message).toBeDefined();

  });

  test('RegisterUser-Fail-UserAlreadyExist', async () => {

    const response = await request(app)
      .post('/register')
      .send(TestData.RegisterUserData);
    expect(response.status).toEqual(409);
    expect(response.body.message).toBeDefined();

  });

  test('RegisterUser-Fail-NoUserSent', async () => {

    const response = await request(app)
      .post('/register')
      .send(null);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBeDefined();

  });

  test('RegisterUser-Fail-InvalidData', async () => {

    const response = await request(app)
      .post('/register')
      .send(TestData.InvalidRegisterUserData);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBeDefined();

  });
});