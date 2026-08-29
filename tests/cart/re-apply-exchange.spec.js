/**
 * re-apply-exchange.spec.js
 * Test: Verify exchange can be re-applied after removal
 * 
 * This test verifies:
 * - After removing exchange, total correctly reflects quantity 2 without exchange
 * - Exchange flow can be initiated again
 * - Modal opens for category selection
 * - Exchange can be re-applied successfully
 * - Discount of ₹4000 is applied again
 * - Total updates to ₹27,998 (or applicable amount based on quantity)
 */

const { test, expect } = require('@playwright/test');
const { CartPage } = require('../helpers/page-objects');

test.describe('Cart Page - Exchange Re-application', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify exchange can be re-applied after removal', async ({ page }) => {
    // Setup: Add product and apply exchange first
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
    await cartPage.applyExchange();

    // Verify exchange is applied
    let isExchangeVisible = await cartPage.isExchangeDiscountVisible();
    expect(isExchangeVisible).toBe(true);

    let totalWithExchange = await cartPage.getTotalAmount();
    expect(totalWithExchange).toContain('₹27,998');

    // Step: Remove exchange (last button in exchange section)
    const exchangeDeleteBtn = page.locator('text=/Exchange your old appliance/i').locator('../../..').getByRole('button').last();
    if (await exchangeDeleteBtn.isVisible()) {
      await exchangeDeleteBtn.click();
    }

    // Verify: After removing exchange, total correctly reflects quantity 2 without exchange
    isExchangeVisible = await cartPage.isExchangeDiscountVisible();
    expect(isExchangeVisible).toBe(false);

    const totalWithoutExchange = await cartPage.getTotalAmount();
    expect(totalWithoutExchange).toContain('₹31,998');

    // Step: Exchange flow can be initiated again
    const selectBtn = page.getByRole('button', { name: /Select/i }).first();
    expect(await selectBtn.isVisible()).toBe(true);
    expect(await selectBtn.isEnabled()).toBe(true);

    // Step: Re-apply exchange with same PIN code and category
    await cartPage.applyExchange();

    // Verify: Exchange can be re-applied successfully
    // Discount of ₹4000 is applied again
    isExchangeVisible = await cartPage.isExchangeDiscountVisible();
    expect(isExchangeVisible).toBe(true);

    // Verify: Total updates to ₹27,998
    const finalTotal = await cartPage.getTotalAmount();
    expect(finalTotal).toContain('₹27,998');

    // Verify: Success message appears
    const successMessage = page.getByText(/Exchange applied.*You saved ₹4000/i);
    expect(await successMessage.isVisible()).toBe(true);
  });
});
