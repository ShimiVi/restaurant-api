const request = require('supertest'); 
const app = require('../src/app'); 


test('GET all categories should return 200' , async () => {
    const respone = await request(app)
    .get('/categories')

    expect(respone.status).toBe(200);
}); 

test('POST create category should return 201', async() => {
    const loginResponse = await request(app)
        .post('/auth/login')
        .send({ email: 'shimi@gmail.com', password: '1234' });
    
    const token = loginResponse.body.token;    

    const response = await request(app)
        .post('/categories')
        .set('authorization', token)
        .send({ name: 'test_' + Date.now(), description: 'test' });


    expect(response.status).toBe(201);
});