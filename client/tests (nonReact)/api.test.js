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
        expect(res.text).toBe('Welcome to Habit Tracker')
    });
});

describe('API habit endpoints', () => {
    it('Should return a 200 status code and a list of habits when habits get all route is used', async () => {
        const res = await request(api)
            .get('/habits')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZiIsImVtYWlsIjoiamVmZkBlbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNjM1NDM0NzQ5fQ.zZbDD4WxZP58o4qpebHBjgvomW54JNoRdXsk5OaLjz8')
            .expect('Content-Type', /json/)
        expect(res.status).toBe(200)
    });

    it('Should return a 200 status code for a specific habit', async () => {
        const res = await request(api)
            .get('/habits/3')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZiIsImVtYWlsIjoiamVmZkBlbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNjM1NDM0NzQ5fQ.zZbDD4WxZP58o4qpebHBjgvomW54JNoRdXsk5OaLjz8')
        expect(res.status).toBe(200)
    });

});

describe('API log endpoints', () => {
    it('Should return a 200 status code and a list of logs when logs get all route is used', async () => {
        const res = await request(api)
            .get('/logs')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZiIsImVtYWlsIjoiamVmZkBlbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNjM1NDM0NzQ5fQ.zZbDD4WxZP58o4qpebHBjgvomW54JNoRdXsk5OaLjz8')
            .expect('Content-Type', /json/)
        expect(res.status).toBe(200)
    });

    it('Should return a 200 status code for a specific log', async () => {
        const res = await request(api)
            .get('/logs/habit/3')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZiIsImVtYWlsIjoiamVmZkBlbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNjM1NDM0NzQ5fQ.zZbDD4WxZP58o4qpebHBjgvomW54JNoRdXsk5OaLjz8')
        expect(res.status).toBe(200)
    });
}); 