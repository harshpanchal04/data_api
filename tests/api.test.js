const request = require('supertest');
const express = require('express');
const apiRoutes = require('../src/routes/api');
const { readData } = require('../src/services/dataService');

jest.mock('../src/services/dataService');

const app = express();
app.use(express.json());  // Add this line to parse JSON request bodies
app.use('/api', apiRoutes);

describe('GET /api/data', () => {
    const mockData = [
        { name: 'John', language: 'English', version: 1.0 },
        { name: 'Alice', language: 'French', version: 2.0 },
        { name: 'Bob', language: 'English', version: 1.5 },
        { name: 'Charlie', language: 'Spanish', version: 3.0 },
        { name: 'Dave', language: 'English', version: 2.5 },
    ];

    beforeEach(() => {
        readData.mockResolvedValue(mockData);
    });

    test('should return all data when no query params', async () => {
        const res = await request(app).get('/api/data');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(5);
    });

    test('should filter data by language', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ filterBy: 'language', filterValue: 'English' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
        expect(res.body.every(item => item.language === 'English')).toBe(true);
    });

    test('should sort data by version in descending order', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ sortBy: 'version', sortOrder: 'desc' });
        expect(res.statusCode).toBe(200);
        expect(res.body[0].version).toBe(3.0);
        expect(res.body[4].version).toBe(1.0);
    });

    test('should sort data by name in ascending order', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ sortBy: 'name', sortOrder: 'asc' });
        expect(res.statusCode).toBe(200);
        expect(res.body[0].name).toBe('Alice');
        expect(res.body[4].name).toBe('John');
    });

    test('should filter and sort data', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ filterBy: 'language', filterValue: 'English', sortBy: 'name', sortOrder: 'asc' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
        expect(res.body[0].name).toBe('Bob');
        expect(res.body[2].name).toBe('John');
    });

    test('should handle case insensitive filtering', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ filterBy: 'language', filterValue: 'english' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
        expect(res.body.every(item => item.language === 'English')).toBe(true);
    });

    test('should handle missing filter value gracefully', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ filterBy: 'language' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(5);
    });

    test('should handle missing sort order gracefully', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ sortBy: 'version' });
        expect(res.statusCode).toBe(200);
        expect(res.body[0].version).toBe(1.0);
        expect(res.body[4].version).toBe(3.0);
    });

    test('should handle non-existent sort field gracefully', async () => {
        const res = await request(app)
            .get('/api/data')
            .send({ sortBy: 'nonexistent', sortOrder: 'asc' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(5);
    });
});
