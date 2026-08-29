/**
 * complete-flow-with-exchange.spec.js
 * Test: Complete purchase flow with exchange
 * 
 * This comprehensive integration test verifies the entire user journey:
 * - Navigate to Water Purifiers category
 * - Select product
 * - Open PDP with all details
 * - Verify product sections
 * - Add to cart
 * - Update quantity to 2
 * - Apply exchange offer with PIN validation
 * - Verify final pricing with discount
 * - Verify checkout is available
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

  // Use href-based selector to avoid strict mode violation
  getAquaguardProduct() {
    return this.page.locator('a[href*="GWPDNROCA0002X"]').first();
  }

  async clickProduct() {
    await this.getAquaguardProduct().click({ noWaitAfter: true });
    await this.page.waitForURL(/GWPDNROCA0002X/, { waitUntil: 'commit' });
    // Wait for PDP heading content to replace category heading after SPA navigation
    await expect(this.page.getByRole('heading', { level: 1 })).toContainText('Aquaguard');
  }
}

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async verifyProductDetails() {
    const title = await this.page.getByRole('heading', { level: 1 }).textContent();
    expect(title).toContain('Aquaguard Enrich Nexen');

    const price = await this.page.locator('text=/₹15,999/').first();
    expect(await price.isVisible()).toBe(true);

    const exchange = await this.page.getByText(/Exchange ANY old appliance/i);
    expect(await exchange.isVisible()).toBe(true);
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

  async updateQuantityTo2() {
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    await productItem.getByRole('button').nth(1).click();
  }

  async applyExchange() {
    await this.page.getByRole('button', { name: /Select/i }).first().click();
    await this.page.getByText(/Water Purifier/i).first().waitFor({ state: 'visible' });
    await this.page.getByText(/Water Purifier/i).first().click();

    const continueBtn = this.page.getByRole('button', { name: /Continue with exchange/i });
    await continueBtn.waitFor({ state: 'visible' });
    await continueBtn.click();

    const pinInput = this.page.getByPlaceholder(/Pincode|PIN/i);
    await pinInput.waitFor({ state: 'visible' });
    await pinInput.fill('122003');
    await this.page.getByRole('button', { name: /Check/i }).click();

    const applyBtn = this.page.getByRole('button', { name: /Apply/i });
    await applyBtn.waitFor({ state: 'visible' });
    await applyBtn.click();
  }

  async verifyExchangeApplied() {
    const message = this.page.getByText(/Exchange applied.*You saved ₹4000/i);
    expect(await message.isVisible()).toBe(true);
  }

  async verifyFinalTotals() {
    // Verify subtotal: ₹31,998 (2 × ₹15,999)
    const subtotalLine = this.page.locator('text=/Subtotal/').locator('..');
    const subtotal = await subtotalLine.locator('text=/₹/').textContent();
    expect(subtotal).toContain('₹31,998');

    // Verify exchange discount: -₹4000
    const discountLine = this.page.locator('text=/Exchange/').locator('..');
    const discount = await discountLine.locator('text=/₹/').textContent();
    expect(discount).toContain('₹4000');

    // Verify total: ₹27,998
    const totalLine = this.page.locator('text=/^Total$/').locator('..');
    const total = await totalLine.locator('text=/₹/').textContent();
    expect(total).toContain('₹27,998');
  }

  async verifyCheckoutAvailable() {
    const checkoutBtn = this.page.getByRole('button', { name: /Continue to checkout/i });
    expect(await checkoutBtn.isVisible()).toBe(true);
    expect(await checkoutBtn.isEnabled()).toBe(true);
  }
}

// ==================== Test Suite ====================

test.describe('Integration Tests - Complete Flow with Exchange', () => {
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

  test('Complete purchase flow with exchange', async ({ page }) => {
    // Step 1: Start at homepage and navigate to Water Purifiers
    await homePage.navigateToHome();
    await homePage.navigateToWaterPurifiers();

    // Step 2: Click on Aquaguard Enrich Nexen product to open PDP
    await categoryPage.clickProduct();

    // Step 3: Verify all PDP sections
    await productPage.verifyProductDetails();

    // Step 4: Click 'Add to cart' on PDP
    await productPage.clickAddToCart();

    // Step 5: Update quantity to 2
    await cartPage.updateQuantityTo2();
    
    // Verify quantity updated
    const quantity = page.locator('text="2"').first();
    expect(await quantity.isVisible()).toBe(true);

    // Step 6: Apply exchange offer with PIN 122003
    await cartPage.applyExchange();

    // Step 7: Verify exchange was applied successfully
    await cartPage.verifyExchangeApplied();

    // Step 8: Verify final order details
    // Subtotal: ₹31,998 (2 × ₹15,999)
    // Exchange discount: -₹4000
    // Total: ₹27,998
    await cartPage.verifyFinalTotals();

    // Step 9: Verify user can proceed to checkout
    await cartPage.verifyCheckoutAvailable();
  });
});
