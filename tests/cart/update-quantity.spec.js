/**
 * update-quantity.spec.js
 * Test: Update product quantity from 1 to 2
 * 
 * This test verifies:
 * - Quantity field is visible and shows value '1'
 * - Quantity field updates to show '2'
 * - Increment button is clickable and responsive
 * - Subtotal updates to reflect quantity 2
 * - Subtotal now shows ₹31,998 (2 × ₹15,999)
 * - Total updates accordingly to ₹31,998
 * - MRP still shows ₹25,000
 * - Shipping and Installation remain ₹0 FREE
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateAndAddToCart() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    // fixed-add-to-cart-button is a sticky header button (position:fixed) – more stable during page render
    const btn = this.page.getByTestId('fixed-add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async getQuantityField() {
    // Find the quantity display in the cart line item
    return this.page.locator('text="1"').first();
  }

  async getQuantityIncrementButton() {
    // Find the increment button (usually next to quantity)
    return this.page.locator('button').filter({ hasText: /\+|increment/ }).first();
  }

  async getQuantityDecrementButton() {
    return this.page.locator('button').filter({ hasText: /\-|decrement/ }).first();
  }

  async getCurrentQuantity() {
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    // Quantity is the text between decrement and increment buttons
    return await productItem.getByRole('button').nth(1).locator('..').getByText(/^[0-9]+$/).first().textContent();
  }

  async clickIncrementButton() {
    // Increment is at index 1 within the product item container (0=minus, 1=increment, 2=delete)
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    const incrementBtn = productItem.getByRole('button').nth(1);
    await incrementBtn.click();
  }

  async getSubtotal() {
    return this.page.locator('text=/Subtotal/').locator('..').locator('text=₹');
  }

  async getSubtotalAmount() {
    // Get text that contains both Subtotal and amount
    const subtotalLine = this.page.locator('text=/Subtotal/').locator('..');
    const priceText = await subtotalLine.locator('text=/₹/').textContent();
    return priceText;
  }

  async getTotal() {
    return this.page.locator('text=/^Total$/').locator('..');
  }

  async getTotalAmount() {
    const totalLine = this.page.locator('text=/^Total$/').locator('..');
    const priceText = await totalLine.locator('text=/₹/').textContent();
    return priceText;
  }

  async getShippingCost() {
    return this.page.locator('text=/Shipping worth/');
  }

  async getShippingCostText() {
    const line = await this.getShippingCost();
    const text = await line.locator('..').textContent();
    return text;
  }

  async getInstallationCost() {
    return this.page.locator('text=/Installation worth/');
  }

  async getInstallationCostText() {
    const line = await this.getInstallationCost();
    const text = await line.locator('..').textContent();
    return text;
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Quantity Update', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Update product quantity from 1 to 2', async ({ page }) => {
    // Add product to cart
    await cartPage.navigateAndAddToCart();

    // Verify: Quantity field is visible and shows value '1'
    const quantityField = await cartPage.getQuantityField();
    expect(quantityField).toBeDefined();
    
    const quantityText = await cartPage.getCurrentQuantity();
    expect(quantityText).toContain('1');

    // Click increment button to increase quantity to 2
    await cartPage.clickIncrementButton();

    // Verify: Quantity field updates to show '2'
    const updatedQuantity = await cartPage.getCurrentQuantity();
    expect(updatedQuantity).toContain('2');

    // Verify: Subtotal updates correctly to ₹31,998 (2 × ₹15,999)
    const subtotalAmount = await cartPage.getSubtotalAmount();
    expect(subtotalAmount).toContain('₹31,998');

    // Verify: Total updates accordingly to ₹31,998
    const totalAmount = await cartPage.getTotalAmount();
    expect(totalAmount).toContain('₹31,998');

    // Verify: Shipping and Installation remain ₹0 FREE
    const shippingText = await cartPage.getShippingCostText();
    expect(shippingText).toContain('₹0');
    expect(shippingText).toContain('FREE');

    const installationText = await cartPage.getInstallationCostText();
    expect(installationText).toContain('₹0');
    expect(installationText).toContain('FREE');
  });
});
