const request = require('supertest'); 
const app = require('../src/app'); 


test('login with wrong password should return 401', async() => {

    const respone = await request(app)
    .post('/auth/login')
    .send({ email: 'shimi@gmail.com', password: 'wrongpassword' });

    expect(respone.status).toBe(401);
});

test('register with short password should return 400', async() =>{
    const respone = await request(app)
    .post('/auth/register')
    .send({
        name: 'Test',
        email: 'test@test.com',
        password: '123',
        role: 'customer',
        phone: '0501234567'
    })

    expect(respone.status).toBe(400);
}); 

test('login with correct credentials should return 200' , async() => {

    const respone = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'}); 

    expect(respone.status).toBe(200);
});

test('register with existing email should return 400' , async() => {
    const respone = await request(app)
    .post('/auth/register')
    .send(
        {name: 'Test' ,
        email: 'shimi@gmail.com' ,
        password: '12345678', 
        role: 'customer', 
        phone: '0501234567'
    }); 

    expect(respone.status).toBe(400); 
});

