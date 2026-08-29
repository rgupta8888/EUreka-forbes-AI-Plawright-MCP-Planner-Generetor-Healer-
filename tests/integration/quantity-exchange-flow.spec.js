/**
 * quantity-exchange-flow.spec.js
 * Test: Purchase flow with quantity update and exchange
 * 
 * This integration test verifies:
 * - Add product to cart (quantity 1)
 * - Update quantity to 3
 * - Verify subtotal updates to ₹47,997 (3 × ₹15,999)
 * - Apply exchange offer (category selection + PIN validation)
 * - Verify discount of ₹4000 is applied
 * - Verify final total becomes ₹43,997 (₹47,997 - ₹4000)
 * - Verify complete order summary
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateAndAddToCart() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const btn = this.page.getByTestId('add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async updateQuantityTo(targetQuantity) {
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    const incrementBtn = productItem.getByRole('button').nth(1);
    for (let i = 1; i < targetQuantity; i++) {
      await incrementBtn.click();
    }
    await expect(productItem.getByText(String(targetQuantity), { exact: true })).toBeVisible();
  }

  async getSubtotalAmount() {
    const line = this.page.locator('text=/Subtotal/').locator('..');
    return await line.locator('text=/₹/').textContent();
  }

  async getTotalAmount() {
    const line = this.page.locator('text=/^Total$/').locator('..');
    return await line.locator('text=/₹/').textContent();
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

  async verifyExchangeDiscountAmount() {
    const discountLine = this.page.locator('text=/Exchange/').locator('..');
    const discountText = await discountLine.locator('text=/₹/').textContent();
    expect(discountText).toContain('₹4000');
  }
}

// ==================== Test Suite ====================

test.describe('Integration Tests - Quantity and Exchange Flow', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Purchase flow with quantity update and exchange', async ({ page }) => {
    // Step 1: Add product to cart (initial quantity 1)
    await cartPage.navigateAndAddToCart();

    // Verify initial state
    const initialSubtotal = await cartPage.getSubtotalAmount();
    expect(initialSubtotal).toContain('₹15,999');

    // Step 2: Update quantity to 3
    await cartPage.updateQuantityTo(3);

    // Step 3: Verify subtotal updates to ₹47,997 (3 × ₹15,999)
    const subtotalAfterQty = await cartPage.getSubtotalAmount();
    expect(subtotalAfterQty).toContain('₹47,997');

    // Verify total before exchange: ₹47,997
    const totalBeforeExchange = await cartPage.getTotalAmount();
    expect(totalBeforeExchange).toContain('₹47,997');

    // Step 4: Apply exchange offer
    await cartPage.applyExchange();

    // Step 5: Verify discount of ₹4000 is applied
    await cartPage.verifyExchangeDiscountAmount();

    // Step 6: Verify final total becomes ₹43,997 (₹47,997 - ₹4000)
    const finalTotal = await cartPage.getTotalAmount();
    expect(finalTotal).toContain('₹43,997');

    // Verify complete order summary
    const subtotal = await cartPage.getSubtotalAmount();
    expect(subtotal).toContain('₹47,997');
    expect(finalTotal).toContain('₹43,997');
  });
});
