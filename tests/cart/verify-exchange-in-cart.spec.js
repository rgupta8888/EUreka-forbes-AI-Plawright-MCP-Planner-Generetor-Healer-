/**
 * verify-exchange-in-cart.spec.js
 * Test: Verify exchange offer section in cart
 * 
 * This test verifies:
 * - Section header 'Exchange your old appliance' is visible
 * - 'Get upto ₹4000 off' message is displayed
 * - 'Select' button is present and clickable
 * - 'Learn more' button is visible
 * - Exchange offer is not yet applied
 * - Section shows as selectable but not active
 */

const { test, expect } = require('@playwright/test');
const { CartPage } = require('../helpers/page-objects');

test.describe('Cart Page - Exchange Section', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify exchange offer section in cart', async ({ page }) => {
    // Add product to cart
    await page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const addToCartBtn = page.getByTestId('add-to-cart-button');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click({ force: true, noWaitAfter: true });
    await expect(page.getByText('Review your cart')).toBeVisible();

    // Find exchange section
    const exchangeSection = page.locator('text=/Exchange your old appliance/i');
    await exchangeSection.scrollIntoViewIfNeeded();

    // Verify: Section header 'Exchange your old appliance' is visible
    expect(await exchangeSection.isVisible()).toBe(true);

    // Verify: 'Get upto ₹4000 off' message is displayed
    const discountMessage = page.getByText(/Get upto ₹4000 off/i);
    expect(await discountMessage.isVisible()).toBe(true);

    // Verify: 'Select' button is present and clickable
    const selectBtn = page.getByRole('button', { name: /Select/i }).first();
    expect(await selectBtn.isVisible()).toBe(true);
    expect(await selectBtn.isEnabled()).toBe(true);

    // Verify: 'Learn more' button is visible
    const learnMoreBtn = page.getByRole('button', { name: /Learn more/i });
    expect(await learnMoreBtn.isVisible()).toBe(true);

    // Verify: Exchange offer is not yet applied (no discount amount shown separately)
    // Note: The exchange section itself shows 'Get upto ₹4000 off' which is the unapplied offer text
    // An APPLIED discount would show 'Exchange applied!' or a separate discount line in order details
    const exchangeAppliedMsg = page.getByText(/Exchange applied|You saved ₹4000/i);
    let isDiscountApplied = false;
    try {
      isDiscountApplied = await exchangeAppliedMsg.isVisible();
    } catch {
      isDiscountApplied = false;
    }
    expect(isDiscountApplied).toBe(false);

    // Verify: Section shows as selectable but not active
    // Check that we can interact with the Select button
    expect(await selectBtn.isEnabled()).toBe(true);
  });
});
