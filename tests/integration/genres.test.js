const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('api/genres', () => {

    beforeAll(() => {
        server = require('../../index');
    });

    afterAll(async () => {
        await Genre.deleteMany();
        await mongoose.disconnect();
        server.close();
    });

    describe('GET /', () => {

        // Setup for individual test
        beforeEach(async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
        });


        it('should return all genres', async () => {
            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {

         // Clean up after individual test
        afterEach(async () => {
            await Genre.deleteMany();
        });

        it('should return a genre if valid ID is passed', async () => {
            const genre = new Genre({name: 'genre1'})
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
        });

        it('should return a 404 if an invalid ID is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => { 

        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name});
        }

        // Setup for individual test
        beforeEach(async () => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });



        it('should return a 401 if client is not logged in', async () => {
            token = '';

            const res = await execute()

            expect(res.status).toBe(401);
        });

        it('should return a 400 if genre is less than 5 characters', async () => {
            name = '1234'

            const res = await execute();

            expect(res.status).toBe(400)
        });
        
        it('should return a 400 if genre is more than 50 characters', async () => {

            name = new Array(52).join('a')

            const res = await execute();

            expect(res.status).toBe(400)
        });

        it('should save the genre if it is valid', async () => {
            const token = new User().generateAuthToken();

            await execute();

            const genre = await Genre.find({name: 'genre1'});

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await execute();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    })
    
});
