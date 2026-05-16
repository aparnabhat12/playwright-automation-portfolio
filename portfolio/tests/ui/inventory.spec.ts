import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory / Product Tests - SauceDemo', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    // Wait for inventory page to fully load
    await page.waitForSelector('.inventory_item', { state: 'visible' });
  });

  test('TC01 - All 6 products are displayed', async () => {
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('TC02 - Products sorted A-Z by default', async () => {
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC03 - Sort products Z to A', async ({ page }) => {
    // Get original first item name
    const beforeNames = await inventoryPage.getItemNames();

    await inventoryPage.sortBy('za');

    const afterNames = await inventoryPage.getItemNames();
    // Z-A should be reverse of A-Z
    expect(afterNames).toEqual([...beforeNames].sort().reverse());
  });

  test('TC04 - Sort products low to high price', async ({ page }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getItemPrices();
    expect(prices.length).toBeGreaterThan(0);

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('TC05 - Sort products high to low price', async ({ page }) => {
    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getItemPrices();
    expect(prices.length).toBeGreaterThan(0);

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('TC06 - Add item to cart updates badge count', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC07 - Add multiple items to cart', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
