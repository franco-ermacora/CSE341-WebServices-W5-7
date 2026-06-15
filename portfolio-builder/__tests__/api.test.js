const request = require('supertest');
const app = require('../server');

describe('Pruebas de endpoints GET', () => {
  test('GET /user responde 200', async () => {
    const res = await request(app).get('/user');
    expect(res.statusCode).toBe(200);
  });
  test('GET /theme responde 200', async () => {
    const res = await request(app).get('/theme');
    expect(res.statusCode).toBe(200);
  });
  test('GET /project responde 200', async () => {
    const res = await request(app).get('/project');
    expect(res.statusCode).toBe(200);
  });
  test('GET /comment responde 200', async () => {
    const res = await request(app).get('/comment');
    expect(res.statusCode).toBe(200);
  });
});