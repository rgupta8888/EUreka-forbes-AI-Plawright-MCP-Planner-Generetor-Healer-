/**
 * verify-product-tags.spec.js
 * Test: Verify product tags and filtering capability
 * 
 * This test verifies:
 * - Category page loads with product listings
 * - Product card displays all four required tags:
 *   - RO+UV
 *   - Active Copper + Alkaline Boost
 *   - 2X Filter Life
 *   - 12 Stage Purification
 * - Price displayed: ₹15,999
 * - MRP shown: ₹25,000 (36% OFF)
 * - Exchange offer badge is visible
 */

const { test, expect } = require('@playwright/test');
const { CategoryPage } = require('../helpers/page-objects');

test.describe('Landing Page - Product Tags Verification', () => {
  let categoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
  });

  test('Verify product tags and filtering capability', async ({ page }) => {
    // Navigate to category page
    await categoryPage.navigateToCategory();

    // Verify: Category page loads with product listings
    const heading = await categoryPage.getPageHeading();
    expect(heading).toContain('Water Purifiers');

    const productsLoaded = await categoryPage.verifyProductsLoaded();
    expect(productsLoaded).toBe(true);

    // Find the Aquaguard Enrich Nexen product
    const productLink = categoryPage.getAquaguardEnrichNexenProduct();
    expect(await productLink.isVisible()).toBe(true);

    // Get the product card container
    const productCard = productLink.locator('..');

    // Verify: All four tags are displayed
    const tags = productCard.locator('text=/RO\\+UV|Active Copper|Alkaline Boost|2X Filter|12 Stage/i');
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);

    // Verify individual tags - use .first() to avoid strict mode when text appears multiple times in card
    const hasROUV = productCard.locator('text=/RO\\+UV/i').first();
    expect(await hasROUV.isVisible()).toBe(true);

    const hasActiveCopper = productCard.locator('text=/Active Copper/i').first();
    expect(await hasActiveCopper.isVisible()).toBe(true);

    const hasAlkalineBoost = productCard.locator('text=/Alkaline Boost/i').first();
    expect(await hasAlkalineBoost.isVisible()).toBe(true);

    const has2XFilter = productCard.locator('text=/2X Filter/i').first();
    expect(await has2XFilter.isVisible()).toBe(true);

    const has12Stage = productCard.locator('text=/12 Stage/i').first();
    expect(await has12Stage.isVisible()).toBe(true);

    // Verify: Price displayed: ₹15,999
    const price = productCard.locator('text=/₹15,999/').first();
    expect(await price.isVisible()).toBe(true);

    // Verify: MRP shown: ₹25,000 (36% OFF)
    const mrp = productCard.locator('text=/MRP ₹25,000|25,000/').first();
    expect(await mrp.isVisible()).toBe(true);

    const discount = productCard.locator('text=/36% OFF/').first();
    expect(await discount.isVisible()).toBe(true);

    // Verify: Exchange offer badge is visible
    const exchangeBadge = productCard.locator('text=/Exchange.*Offer|₹4000 Exchange/i').first();
    expect(await exchangeBadge.isVisible()).toBe(true);
  });
});
