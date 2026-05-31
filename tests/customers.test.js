const request = require('supertest'); 
const app = require('../src/app'); 


test('GET all customers should return 200', async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .get('/customers')
    .set('authorization', token)

    expect(respone.status).toBe(200);
});

test('GET customer by id should return 200' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const response = await request(app)
    .get('/customers/1')
    .set('authorization', token)

    expect(response.status).toBe(200)
})

test('GET customer by nonexistent id should return 404' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const response = await request(app)
    .get('/customers/999')
    .set('authorization', token)

    expect(response.status).toBe(404)
})

test('POST create customer should return 201' , async() =>{

    const response = await request(app)
    .post('/customers')
    .send({
        name: 'test',
        phone: '050' + Date.now().toString().slice(-7),
        email: 'test_' + Date.now() + '@test.com'
    })

    expect(response.status).toBe(201)
})
 
test('PUT update customer should return 200' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email:'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token;

    const respone = await request(app)
    .put('/customers/1')
    .send({
        name: 'shimi', 
        phone: '0555555555',
        email: 'test_' + Date.now() + '@test.com'
    })
    .set('authorization', token)

    expect(respone.status).toBe(200)
}); 

test('PUT update customer without token should return 401' , async() => {

    const respone = await request(app)
    .put('/customers/1')
    .send({
        name: 'shimi', 
        phone: '0555555555',
        email: 'test_' + Date.now() + '@test.com'
    })

    expect(respone.status).toBe(401)
}); 