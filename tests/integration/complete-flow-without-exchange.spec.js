/**
 * complete-flow-without-exchange.spec.js
 * Test: Complete purchase flow without exchange
 * 
 * This integration test verifies the user journey:
 * - Navigate to Water Purifiers category
 * - Select product
 * - Open PDP
 * - Add to cart
 * - Keep quantity at 1 (default)
 * - Skip exchange offer selection
 * - Verify order totals without exchange
 * - Proceed to checkout
 */

const { test, expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('https://www.eurekaforbes.com/', { waitUntil: 'domcontentloaded' });
  }

  async navigateToWaterPurifiers() {
    await this.page.goto('https://www.eurekaforbes.com/c/water-purifiers', { waitUntil: 'domcontentloaded' });
  }
}

class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  async clickAquaguardProduct() {
    await this.page.locator('a[href*="GWPDNROCA0002X"]').first().click({ noWaitAfter: true });
    await this.page.waitForURL(/GWPDNROCA0002X/, { waitUntil: 'commit' });
    await expect(this.page.getByRole('heading', { level: 1 })).toContainText('Aquaguard');
  }
}

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async clickAddToCart() {
    const btn = this.page.getByTestId('add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyQuantityRemainOne() {
    const quantity = this.page.locator('text="1"').first();
    expect(await quantity.isVisible()).toBe(true);
  }

  async verifyOrderTotalsWithoutExchange() {
    // Verify MRP: ₹25,000
    const mrpLine = this.page.locator('text=/MRP/').locator('..');
    const mrp = await mrpLine.locator('text=/₹25,000/').textContent();
    expect(mrp).toContain('₹25,000');

    // Verify Subtotal: ₹15,999 (1 × ₹15,999)
    const subtotalLine = this.page.locator('text=/Subtotal/').locator('..');
    const subtotal = await subtotalLine.locator('text=/₹/').textContent();
    expect(subtotal).toContain('₹15,999');

    // Verify Shipping: ₹0 FREE
    const shippingLine = this.page.locator('text=/Shipping/').locator('..');
    const shipping = await shippingLine.textContent();
    expect(shipping).toContain('₹0');
    expect(shipping).toContain('FREE');

    // Verify Installation: ₹0 FREE
    const installLine = this.page.locator('text=/Installation/').locator('..');
    const install = await installLine.textContent();
    expect(install).toContain('₹0');
    expect(install).toContain('FREE');

    // Verify Total: ₹15,999
    const totalLine = this.page.locator('text=/^Total$/').locator('..');
    const total = await totalLine.locator('text=/₹/').textContent();
    expect(total).toContain('₹15,999');
  }

  async verifyNoExchangeDiscountLine() {
    const discountLine = this.page.locator('text=/Exchange.*discount|Exchange.*off/i');
    const isVisible = await discountLine.isVisible();
    expect(isVisible).toBe(false);
  }

  async verifyCheckoutButtonVisible() {
    const checkoutBtn = this.page.getByRole('button', { name: /Continue to checkout/i });
    expect(await checkoutBtn.isVisible()).toBe(true);
    expect(await checkoutBtn.isEnabled()).toBe(true);
  }

  async verifyExchangeSelectButtonVisible() {
    const selectBtn = this.page.getByRole('button', { name: /Select/i }).first();
    expect(await selectBtn.isVisible()).toBe(true);
  }
}

// ==================== Test Suite ====================

test.describe('Integration Tests - Complete Flow without Exchange', () => {
  let homePage;
  let categoryPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    productPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('Complete purchase flow without exchange', async ({ page }) => {
    // Step 1: Navigate to Water Purifiers category
    await homePage.navigateToHome();
    await homePage.navigateToWaterPurifiers();

    // Step 2: Select Aquaguard Enrich Nexen and click to open PDP
    await categoryPage.clickAquaguardProduct();

    // Step 3: Click 'Add to cart'
    await productPage.clickAddToCart();

    // Step 4: Verify quantity remains 1 (default)
    await cartPage.verifyQuantityRemainOne();

    // Step 5: Skip exchange offer selection (don't click Select button)
    await cartPage.verifyExchangeSelectButtonVisible();

    // Step 6: Verify no exchange discount is applied
    await cartPage.verifyNoExchangeDiscountLine();

    // Step 7: Verify order totals without exchange
    // MRP: ₹25,000
    // Subtotal: ₹15,999
    // Shipping & Installation: Free
    // Total: ₹15,999
    await cartPage.verifyOrderTotalsWithoutExchange();

    // Step 8: Verify checkout button is clickable
    await cartPage.verifyCheckoutButtonVisible();
  });
});
