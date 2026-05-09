import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Flow Tests - SauceDemo', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('TC01 - Complete end-to-end purchase flow', async ({ page }) => {
    // Add 2 items to cart
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.addItemToCartByIndex(1);

    // Go to cart and verify
    await inventoryPage.goToCart();
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(2);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill shipping info
    await checkoutPage.fillShippingInfo('John', 'Doe', '560001');

    // Verify order summary page
    await expect(page.locator('.summary_info')).toBeVisible();

    // Finish order
    await checkoutPage.finishCheckout();

    // Verify order confirmation
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you for your order');
  });

  test('TC02 - Cart persists selected items', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    const itemNames = await inventoryPage.getItemNames();
    const firstItemName = itemNames[0];

    await inventoryPage.goToCart();
    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames[0]).toBe(firstItemName);
  });

  test('TC03 - Checkout requires first name', async ({ page }) => {
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Submit without filling info
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
