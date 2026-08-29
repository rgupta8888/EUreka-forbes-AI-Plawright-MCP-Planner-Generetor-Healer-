/**
 * verify-exchange-discount.spec.js
 * Test: Verify exchange discount in order details
 * 
 * This test verifies:
 * - Order details section is updated
 * - New exchange discount line item appears in the breakdown
 * - Exchange discount shows ₹4000 deduction
 * - Discount is clearly labeled
 * - New subtotal reflects the exchange: ₹31,998 - ₹4000 = ₹27,998
 * - Total displayed is ₹27,998 (for quantity 2 with exchange)
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateCartWithExchange() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    // fixed button is stable during page render
    const btn = this.page.getByTestId('fixed-add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();

    // Update quantity to 2
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    await productItem.getByRole('button').nth(1).click();

    // Apply exchange
    await this.page.getByRole('button', { name: /Select/i }).first().click();
    const modal = this.page.locator('[data-testid="modal-container"]');
    await modal.waitFor({ state: 'visible' });
    await modal.getByText(/Water Purifier/i).first().click();

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

  async scrollToOrderDetails() {
    const orderDetailsHeading = this.page.getByText(/Order details/i);
    await orderDetailsHeading.scrollIntoViewIfNeeded();
  }

  async getOrderDetailsSection() {
    return this.page.getByText(/Order details/i).locator('..');
  }

  async getExchangeDiscountLine() {
    return this.page.locator('text=/Exchange.*discount|Exchange.*off/i');
  }

  async getExchangeDiscountAmount() {
    const line = await this.getExchangeDiscountLine();
    if (await line.isVisible()) {
      const text = await line.locator('..').textContent();
      return text;
    }
    return null;
  }

  async getSubtotal() {
    return this.page.locator('text=/Subtotal/').locator('..');
  }

  async getSubtotalAmount() {
    const line = await this.getSubtotal();
    const text = await line.locator('text=/₹/').textContent();
    return text;
  }

  async getTotal() {
    return this.page.locator('text=/^Total$/').locator('..');
  }

  async getTotalAmount() {
    const line = await this.getTotal();
    const text = await line.locator('text=/₹/').textContent();
    return text;
  }

  async isExchangeDiscountVisible() {
    const line = await this.getExchangeDiscountLine();
    return await line.isVisible();
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Exchange Discount Verification', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify exchange discount in order details', async ({ page }) => {
    // Setup: Navigate to cart with exchange applied
    await cartPage.navigateCartWithExchange();

    // Scroll to Order details section
    await cartPage.scrollToOrderDetails();

    // Verify: Order details section is updated
    const orderDetailsSection = await cartPage.getOrderDetailsSection();
    expect(await orderDetailsSection.isVisible()).toBe(true);

    // Verify: New exchange discount line item appears in the breakdown
    const discountVisible = await cartPage.isExchangeDiscountVisible();
    expect(discountVisible).toBe(true);

    // Verify: Exchange discount shows ₹4000 deduction and is clearly labeled
    const discountAmount = await cartPage.getExchangeDiscountAmount();
    expect(discountAmount).toContain('₹4000');
    expect(discountAmount.toLowerCase()).toContain('exchange');

    // Verify: Subtotal reflects the exchange
    // Subtotal should be ₹31,998 (2 × ₹15,999)
    const subtotal = await cartPage.getSubtotalAmount();
    expect(subtotal).toContain('₹31,998');

    // Verify: Total displayed is ₹27,998 (for quantity 2 with ₹4000 exchange)
    // Total = ₹31,998 - ₹4000 = ₹27,998
    const total = await cartPage.getTotalAmount();
    expect(total).toContain('₹27,998');
  });
});
