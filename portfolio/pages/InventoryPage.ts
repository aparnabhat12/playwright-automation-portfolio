import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCartByIndex(index: number) {
    const addBtn = this.inventoryItems
      .nth(index)
      .locator('button[data-test^="add-to-cart"]');
    await addBtn.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItems
      .locator('.inventory_item_name')
      .allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .locator('.inventory_item_price')
      .allInnerTexts();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
