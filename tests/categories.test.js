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

test('GET category by nonexistent id should return 404' , async() => {
    const respone = await request(app)
    .get('/categories/999')

    expect(respone.status).toBe(404); 
}); 

test('GET id categories should return 200', async() => {
    const respone = await request(app)
    .get('/categories/1')

    expect(respone.status).toBe(200); 
});

test('PUT update category should return 200',async() => {

    const loginResponse = await request(app)
    .post("/auth/login")
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .put('/categories/1')
    .set('authorization' , token)
    .send({name: "banana" , description: "fruit"})

    expect(respone.status).toBe(200); 
}); 

test('DELETE category should return 204' , async() =>{

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})
    
    const token = loginResponse.body.token; 

    const createRespone = await request(app)
    .post('/categories')
    .set('authorization' , token) 
    .send({name: 'delete_test_' + Date.now() });

    const id  = createRespone.body.id; 

    const respone = await request(app)
    .delete(`/categories/${id}`)
    .set('authorization', token);

    expect(respone.status).toBe(204); 
}); 

test('DELETE nonexistent category should return 404' , async() => {
    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token;
    
    const respone = await request(app)
    .delete("/categories/999")
    .set('authorization' , token)
    .send()

    expect(respone.status).toBe(404); 
}); 

test('POST create category without name should return 400' , async() => {
    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token;

    const respone = await request(app)
    .post('/categories')
    .set('authorization', token)
    .send({description: 'test'})

    expect(respone.status).toBe(400);
}); 

test('POST create category without token should return 401' , async() => {

    const response = await request(app)
    .post('/categories')
    .send({ name: 'test_' + Date.now(), description: 'test' });

    expect(response.status).toBe(401);
});
