/**
 * verify-coupons.spec.js
 * Test: Verify coupons and benefits section
 * 
 * This test verifies:
 * - Section header 'Coupons and benefits' is visible
 * - 'Apply Coupon' button is present and clickable
 * - Bank offers section shows '10% instant discount on all credit/debit cards'
 * - EMI offers are displayed
 * - No coupon is applied initially
 */

const { test, expect } = require('@playwright/test');

test.describe('Cart Page - Coupons and Benefits', () => {
  test('Verify coupons and benefits section', async ({ page }) => {
    // Add product to cart
    await page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const addToCartBtn = page.getByTestId('add-to-cart-button');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click({ force: true, noWaitAfter: true });
    await expect(page.getByText('Review your cart')).toBeVisible();
    const couponsSection = page.getByText(/Coupons and benefits/i);
    await couponsSection.scrollIntoViewIfNeeded();

    // Verify: Section header 'Coupons and benefits' is visible
    expect(await couponsSection.isVisible()).toBe(true);

    // Verify: 'Apply Coupon' button is present
    const applyCouponBtn = page.getByRole('button', { name: /Apply Coupon/i });
    expect(await applyCouponBtn.isVisible()).toBe(true);

    // Verify: Button is clickable
    expect(await applyCouponBtn.isEnabled()).toBe(true);

    // Verify: Bank offers section shows discount message
    const bankOffers = page.getByText(/10% instant discount.*credit|debit cards/i);
    expect(await bankOffers.isVisible()).toBe(true);

    // Verify: EMI offers are displayed
    const emiOffers = page.getByText(/10% off with EMI|EMI plans/i).first();
    expect(await emiOffers.isVisible()).toBe(true);

    // Verify: No coupon discount applied yet
    const appliedCoupon = page.locator('text=/Coupon applied|Discount applied/i');
    let isCouponApplied = false;
    try {
      isCouponApplied = await appliedCoupon.isVisible();
    } catch {
      isCouponApplied = false;
    }
    expect(isCouponApplied).toBe(false);
  });
});
