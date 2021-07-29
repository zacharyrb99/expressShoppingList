process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');

describe('GET /items', () => {
    test('Gets all items from shopping list', async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [
            {name: "doritos", price: 3.99},
            {name: "tomatoes", price: 0.50},
            {name: "sprite", price: 2.49},
            {name: "bread", price: 4.99},
            {name: "popsicles", price: 5.99}
        ]});
    });
});

describe('GET /items/:name', () => {
    test('Gets a single item from shopping list', async function(){
        const resp = await request(app).get('/items/doritos');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {name: "doritos", price: 3.99}});
    });
});

describe('POST /items', () => {
    test('Post a new item to the shopping list', async function(){
        const resp = await request(app).post('/items').send({
            name: "cheerios", price: 299.99
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {name: "cheerios", price: 299.99}});
    });
});

describe('PATCH /items/:name', () => {
    test('Update an item on the shopping list', async function(){
        const resp = await request(app).patch('/items/doritos').send({name: "doritos", price: 299.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated_item: {name: "doritos", price: 299.99}});
    });
});

describe('DELETE /items/:name', () => {
    test('Delete an item from the shopping list', async function(){
        const resp = await request(app).delete('/items/sprite');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({Deleted: {name: "sprite", price: 2.49}})
    });
});