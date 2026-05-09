import { test, expect } from '@playwright/test';
import { getRequest, postRequest, deleteRequest } from '../../utils/apiHelper';

test.describe('API Tests - Posts (JSONPlaceholder)', () => {

  test('TC01 - GET all posts returns 100 posts', async ({ request }) => {
    const response = await getRequest(request, '/posts');
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBe(100);
  });

  test('TC02 - GET posts by user ID', async ({ request }) => {
    const response = await getRequest(request, '/posts?userId=1');
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });
  });

  test('TC03 - GET single post returns correct structure', async ({ request }) => {
    const response = await getRequest(request, '/posts/1');
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  test('TC04 - POST create new post returns 201 with id', async ({ request }) => {
    const newPost = {
      title: 'Playwright Automation Portfolio',
      body: 'This is a test post created by Playwright API test.',
      userId: 1,
    };

    const response = await postRequest(request, '/posts', newPost);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(newPost.title);
    expect(body.userId).toBe(newPost.userId);
  });

  test('TC05 - GET comments for a post', async ({ request }) => {
    const response = await getRequest(request, '/posts/1/comments');
    expect(response.status()).toBe(200);

    const comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
    comments.forEach((comment: any) => {
      expect(comment).toHaveProperty('email');
      expect(comment.postId).toBe(1);
    });
  });

  test('TC06 - DELETE a post returns 200', async ({ request }) => {
    const response = await deleteRequest(request, '/posts/1');
    expect(response.status()).toBe(200);
  });

  test('TC07 - Response time is under 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await getRequest(request, '/posts');
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });
});
