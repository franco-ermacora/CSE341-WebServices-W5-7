const request = require('supertest');
const app = require('../server'); // Asegúrate de que tu server exporte la app

describe('GET /user', () => {
  test('Debería responder con status 200 y formato JSON', async () => {
    const response = await request(app).get('/user');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});