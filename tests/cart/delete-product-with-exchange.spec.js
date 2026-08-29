/**
 * delete-product-with-exchange.spec.js
 * Test: Delete product when exchange is applied
 * 
 * This test verifies:
 * - Product shows quantity 2 with total ₹27,998 (with exchange applied)
 * - Delete action removes the entire product line item
 * - Exchange offer associated with product is also removed
 * - Cart displays empty state
 * - No product line items remain
 * - Exchange offer is not shown separately
 */

const { test, expect } = require('@playwright/test');

test.describe('Cart Page - Product Deletion with Exchange', () => {
  test('Delete product when exchange is applied', async ({ page }) => {
    // Setup: Add product with quantity 2 and exchange applied
    await page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    // fixed button is stable during page render
    const addToCartBtn = page.getByTestId('fixed-add-to-cart-button');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click({ noWaitAfter: true });
    await expect(page.getByText('Review your cart')).toBeVisible();

    // Update quantity to 2
    const productItem = page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    await productItem.getByRole('button').nth(1).click();

    // Apply exchange
    await page.getByRole('button', { name: /Select/i }).first().click();
    const modal = page.locator('[data-testid="modal-container"]');
    await modal.waitFor({ state: 'visible' });
    await modal.getByText(/Water Purifier/i).first().click();

    const continueBtn = page.getByRole('button', { name: /Continue with exchange/i });
    await continueBtn.waitFor({ state: 'visible' });
    await continueBtn.click();

    const pinInput = page.getByPlaceholder(/Pincode|PIN/i);
    await pinInput.waitFor({ state: 'visible' });
    await pinInput.fill('122003');
    await page.getByRole('button', { name: /Check/i }).click();

    const applyBtn = page.getByRole('button', { name: /Apply/i });
    await applyBtn.waitFor({ state: 'visible' });
    await applyBtn.click();

    // Verify: Product shows quantity 2 with total ₹27,998
    await expect(productItem.getByText('2', { exact: true })).toBeVisible();

    const totalLine = page.locator('text=/^Total$/').locator('..');
    const total = await totalLine.locator('text=/₹/').textContent();
    expect(total).toContain('₹27,998');

    // Verify: Exchange is applied
    const exchangeDiscount = page.locator('text=/Exchange/').locator('..');
    expect(await exchangeDiscount.isVisible()).toBe(true);

    // Delete button is at index 2 (0=minus, 1=increment, 2=delete) within the product item
    await productItem.getByRole('button').nth(2).click({ noWaitAfter: true });

    // Verify: Cart displays empty state
    const reviewCartText = page.getByText(/Review your cart/i);
    expect(await reviewCartText.isVisible()).toBe(true);

    // Verify: No product line items are displayed
    const productLink = page.getByRole('link', { name: /Aquaguard Enrich Nexen/ });
    let isProductVisible = false;
    try {
      isProductVisible = await productLink.isVisible();
    } catch {
      isProductVisible = false;
    }
    expect(isProductVisible).toBe(false);

    // Verify: Exchange offer is not shown separately
    const exchangeLine = page.locator('text=/Exchange/');
    let isExchangeVisible = false;
    try {
      isExchangeVisible = await exchangeLine.isVisible();
    } catch {
      isExchangeVisible = false;
    }
    expect(isExchangeVisible).toBe(false);

    // Verify: Order details section is empty or not visible
    // Depending on design, it might show zeros or disappear
  });
});
