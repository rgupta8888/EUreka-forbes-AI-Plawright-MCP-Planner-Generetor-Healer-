/**
 * verify-quantity-limits.spec.js
 * Test: Verify quantity controls and limits
 * 
 * This test verifies:
 * - Decrement button is disabled when quantity is 1
 * - Quantity remains at 1 when trying to decrement
 * - Increment button works correctly
 * - Quantity updates from 1 to 3
 * - Decrement button is active when quantity > 1
 * - Quantity decreases correctly from 3 to 1
 */

const { test, expect } = require('@playwright/test');
const { CartPage } = require('../helpers/page-objects');

test.describe('Cart Page - Quantity Controls', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify quantity cannot go below 1', async ({ page }) => {
    // Add product to cart first
    await page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const addToCartBtn = page.getByTestId('add-to-cart-button');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click({ force: true, noWaitAfter: true });
    await expect(page.getByText('Review your cart')).toBeVisible();

    // Product item is our anchor for all quantity buttons
    const productItem = page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    const decrementBtn = productItem.getByRole('button').nth(0);
    const incrementBtn = productItem.getByRole('button').nth(1);

    // Verify: Decrement button is disabled at quantity 1
    expect(await decrementBtn.isDisabled()).toBe(true);

    // Verify: Quantity remains at 1
    await expect(productItem.getByText('1', { exact: true })).toBeVisible();

    // Step: Increment to 2
    await incrementBtn.click();

    // Verify: Quantity updates to 2
    await expect(productItem.getByText('2', { exact: true })).toBeVisible();

    // Click increment again to get to 3
    await incrementBtn.click();

    // Verify: Quantity is now 3
    await expect(productItem.getByText('3', { exact: true })).toBeVisible();

    // Verify: Decrement button is now enabled when quantity > 1
    expect(await decrementBtn.isEnabled()).toBe(true);

    // Click decrement to go back to 2
    await decrementBtn.click();
    await expect(productItem.getByText('2', { exact: true })).toBeVisible();

    // Click decrement again to go to 1
    await decrementBtn.click();
    await expect(productItem.getByText('1', { exact: true })).toBeVisible();
  });
});
