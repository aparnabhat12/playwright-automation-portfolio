import { APIRequestContext } from '@playwright/test';

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getRequest(request: APIRequestContext, endpoint: string) {
  const response = await request.get(`${BASE_URL}${endpoint}`);
  return response;
}

export async function postRequest(
  request: APIRequestContext,
  endpoint: string,
  body: object
) {
  const response = await request.post(`${BASE_URL}${endpoint}`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function putRequest(
  request: APIRequestContext,
  endpoint: string,
  body: object
) {
  const response = await request.put(`${BASE_URL}${endpoint}`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function deleteRequest(
  request: APIRequestContext,
  endpoint: string
) {
  const response = await request.delete(`${BASE_URL}${endpoint}`);
  return response;
}
