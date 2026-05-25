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

test('GET all orders without token should return 401' , async() => {
    const respone = await request(app)
    .get('/orders')

    expect(respone.status).toBe(401); 
});

test('GET all orders with owner token should return 200' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .get('/orders')
    .set('authorization' , token)
    
    expect(respone.status).toBe(200); 


});

test('GET order by nonexistent id should return 404' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email:'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token;

    const respone = await request(app)
    .get('/orders/999')
    .set('authorization' , token)

    expect(respone.status).toBe(404); 
}); 

test('PUT update order status should return 200' , async() =>{

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email:'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token

    const respone = await request(app)
    .put('/orders/2')
    .send({status: 'confirmed'})
    .set('authorization' , token)

    expect(respone.status).toBe(200)
}); 