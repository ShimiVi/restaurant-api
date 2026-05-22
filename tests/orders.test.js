const request = require('supertest'); 
const app = require('../src/app');


test('customer accessing another customer order should return 403', async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'test4@test.com' , password: '123456'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .get('/orders/1')
    .set('authorization' , token)

    expect(respone.status).toBe(403); 
});