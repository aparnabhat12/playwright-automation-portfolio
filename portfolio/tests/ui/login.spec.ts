import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests - SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC02 - Login fails with invalid password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('TC03 - Login fails with empty username', async ({ page }) => {
    await loginPage.login('', 'secret_sauce');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('TC04 - Login fails with locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('TC05 - Login page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('TC06 - Login button is visible and enabled', async ({ page }) => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });
});
