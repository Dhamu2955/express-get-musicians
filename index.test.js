// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest");
const { db } = require('./db/connection');
const { Musician } = require('./models/index');
const app = require('./src/app');
const { seedMusician } = require("./seedData");

describe('GET /musicians endpoint', () => {

    test("Testing bakedGoods endpoint", async () => {
        const response = await request(app).get("/musicians");
    })

    test('Should respond with status code 200', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    });

    test('Should return all musicians', async () => {
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);

        expect(responseData[0]).toHaveProperty('id');
        expect(responseData[0]).toHaveProperty('name');
        expect(responseData[0]).toHaveProperty('instrument');
        expect(responseData[0]).toHaveProperty('createdAt');
        expect(responseData[0]).toHaveProperty('updatedAt');

        expect(responseData[0].name).toBe('Mick Jagger');
        expect(responseData[1].name).toBe('Drake');
        expect(responseData[2].name).toBe('Jimi Hendrix');
    });
});

describe('GET /bands endpoint', () => {
    test('Should respond with status code 200', async () => {
        const response = await request(app).get('/bands');
        expect(response.statusCode).toBe(200);
    });

    test('Should return JSON data', async () => {
        const response = await request(app).get('/bands');
        expect(response.headers['content-type']).toContain('application/json');
    });

    test('Should return all bands', async () => {
        const response = await request(app).get('/bands');
        const responseData = JSON.parse(response.text);

        expect(responseData[0].name).toBe('The Beatles');
        expect(responseData[1].name).toBe('Black Pink');
        expect(responseData[2].name).toBe('Coldplay');

        expect(responseData[0].genre).toBe('Rock');
        expect(responseData[1].genre).toBe('Pop');
        expect(responseData[2].genre).toBe('Rock');
    });
});
