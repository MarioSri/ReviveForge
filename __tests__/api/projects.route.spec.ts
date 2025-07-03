import request from 'supertest';
import { createServer } from 'http';
import handler from '../../app/api/projects/route';

describe('Projects API', () => {
  it('should reject unauthenticated POST', async () => {
    const res = await request(createServer(handler.POST)).post('/api/projects').send({});
    expect(res.status).toBe(401);
  });
  // Add more integration tests for GET, POST, error flows...
});
