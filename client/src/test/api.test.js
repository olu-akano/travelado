const request = require("supertest");

let api;

beforeAll(() => {
    api = `http://localhost:3000`;
});

describe('API endpoints', () => {
    it('Should return a 200 status code', async () => {
        const res = await request(api)
            .get('/')
        expect(res.status).toBe(200);
        // expect(res.text).toBe('Welcome to Trevalado')
    });
});