import { describe, it, expect } from '@jest/globals';

describe('API Endpoint', () => {
  it('should return 200 and data for valid request', async () => {
    // Simulate API handler
    const handler = (req: { id: string }) => {
      if (!req.id) return { status: 400, error: 'Missing id' };
      return { status: 200, data: { id: req.id, value: 'foo' } };
    };
    const response = handler({ id: 'item-1' });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: 'item-1', value: 'foo' });
  });

  it('should return 400 for missing id', async () => {
    const handler = (req: { id?: string }) => {
      if (!req.id) return { status: 400, error: 'Missing id' };
      return { status: 200, data: { id: req.id, value: 'foo' } };
    };
    const response = handler({});
    expect(response.status).toBe(400);
    expect(response.error).toBe('Missing id');
  });

  it('should handle internal errors gracefully', async () => {
    const handler = (_: any) => {
      try {
        throw new Error('Internal error');
      } catch (err: any) {
        return { status: 500, error: err.message };
      }
    };
    const response = handler({ id: 'item-1' });
    expect(response.status).toBe(500);
    expect(response.error).toBe('Internal error');
  });
});
