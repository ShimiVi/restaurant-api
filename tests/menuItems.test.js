const request = require('supertest')
const app = require('../src/app')

test('GET all menu items should return 200', async() => {

    const respone = await request(app)
    .get('/menu-items')
    
    expect(respone.status).toBe(200); 
});

test('GET menu item by id should return 200' , async() => {

    const respone = await request(app)
    .get('/menu-items/1')

    expect(respone.status).toBe(200); 
})

test('GET menu item by nonexistent id should return 404', async() => {

    const respone = await request(app)
    .get('/menu-items/999')

    expect(respone.status).toBe(404); 
});

test('POST create menu item should return 201', async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token;

    const respone = await request(app)
    .post('/menu-items')
    .set('authorization', token)
    .send({name: 'shimi', price: '100', category_id: '1'})

    expect(respone.status).toBe(201); 
}); 

test('POST create menu item without token should return 401' , async() => {

    const respone = await request(app)
    .post('/menu-items')
    .send({name: 'shimi', price: '100', category_id: '1'})

    expect(respone.status).toBe(401); 
}); 

test('POST create menu item with negative price should return 400' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: "shimi@gmail.com" , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .post('/menu-items')
    .set('authorization', token)
    .send({name: 'shimi',price: '-20' ,category_id: '1'})

    expect(respone.status).toBe(400)
})

test('PUT update menu item should return 200' , async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .put('/menu-items/1')
    .set('authorization', token)
    .send({name: 'shimi',price: '200' ,category_id: '1'})

    expect(respone.status).toBe(200)
});

test('PUT update menu item with negative price should return 400' , async() =>{
    
    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

    const token = loginResponse.body.token; 

    const respone = await request(app)
    .put('/menu-items/1')
    .set('authorization', token)
    .send({name: 'shimi',price: '-20' ,category_id: '1'})

    expect(respone.status).toBe(400); 
});

test('DELETE menu item should return 204' , async() => {

const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com' , password: '1234'})

const token = loginResponse.body.token;     

const createResponse = await request(app)
    .post('/menu-items')
    .set('authorization', token)
    .send({ name: 'delete_test_' + Date.now(), price: 10, category_id: 1 });

const id = createResponse.body.id;

const response = await request(app)
    .delete(`/menu-items/${id}`)
    .set('authorization', token);

    expect(response.status).toBe(204);
}); 


test('DELETE nonexistent menu item should return 404', async() => {

    const loginResponse = await request(app)
    .post('/auth/login')
    .send({email: 'shimi@gmail.com', password: '1234'})

    const token = loginResponse.body.token;

    const response = await request(app)
    .delete('/menu-items/999')
    .set('authorization', token);

    expect(response.status).toBe(404);
});

