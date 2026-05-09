import { test, expect } from '@playwright/test';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/apiHelper';

test.describe('API Tests - Users (JSONPlaceholder)', () => {

  test('TC01 - GET all users returns 200 and 10 users', async ({ request }) => {
    const response = await getRequest(request, '/users');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(10);
  });

  test('TC02 - GET single user by ID returns correct user', async ({ request }) => {
    const response = await getRequest(request, '/users/1');
    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('username');
  });

  test('TC03 - GET user with invalid ID returns 404', async ({ request }) => {
    const response = await getRequest(request, '/users/99999');
    expect(response.status()).toBe(404);
  });

  test('TC04 - POST create new user returns 201', async ({ request }) => {
    const newUser = {
      name: 'Test QA Engineer',
      username: 'qaengineer',
      email: 'qa@test.com',
    };

    const response = await postRequest(request, '/users', newUser);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(newUser.name);
    expect(body.email).toBe(newUser.email);
  });

  test('TC05 - PUT update user returns 200', async ({ request }) => {
    const updatedUser = {
      id: 1,
      name: 'Updated Name',
      username: 'updateduser',
      email: 'updated@test.com',
    };

    const response = await putRequest(request, '/users/1', updatedUser);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(updatedUser.name);
  });

  test('TC06 - DELETE user returns 200', async ({ request }) => {
    const response = await deleteRequest(request, '/users/1');
    expect(response.status()).toBe(200);
  });

  test('TC07 - Response headers contain correct content type', async ({ request }) => {
    const response = await getRequest(request, '/users');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('TC08 - User schema validation', async ({ request }) => {
    const response = await getRequest(request, '/users/1');
    const user = await response.json();

    // Schema check - all required fields present
    const requiredFields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
    for (const field of requiredFields) {
      expect(user).toHaveProperty(field);
    }

    // Type checks
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
  });
});
