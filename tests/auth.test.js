const request = require('supertest'); 
const app = require('../src/app'); 

test('login with wrong password should return 401', async() => {

    const respone = await request(app)
    .post('/auth/login')
    .send({ email: 'shimi@gmail.com', password: 'wrongpassword' });

    expect(respone.status).toBe(401);
});