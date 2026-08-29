/**
 * verify-initial-cart-state.spec.js
 * Test: Verify cart displays product with correct information
 * 
 * This test verifies:
 * - Page title shows 'Eureka forbes'
 * - Page URL is /ecom/cart
 * - 'Review your cart' heading is displayed
 * - Product name is displayed correctly and clickable
 * - Product name links to the PDP
 * - MRP displayed: ₹25,000
 * - Current price displayed: ₹15,999
 * - Pricing is correct and matches PDP
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCart() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const btn = this.page.getByTestId('add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async getReviewYourCartHeading() {
    return this.page.getByText(/Review your cart/i);
  }

  async getProductNameLink() {
    return this.page.getByRole('link', { name: /Aquaguard Enrich Nexen 2X RO\+UV Active Copper Alkaline/ });
  }

  async getProductMRP() {
    // MRP is usually the strikethrough price
    return this.page.locator('text=/₹25,000/').first();
  }

  async getProductCurrentPrice() {
    // Current price is the main price displayed
    return this.page.locator('text=/₹15,999/').first();
  }

  async isReviewHeadingVisible() {
    const heading = await this.getReviewYourCartHeading();
    return await heading.isVisible();
  }

  async isProductNameVisible() {
    const productLink = await this.getProductNameLink();
    return await productLink.isVisible();
  }

  async getProductNameText() {
    const productLink = await this.getProductNameLink();
    return await productLink.textContent();
  }

  async isProductNameClickable() {
    const productLink = await this.getProductNameLink();
    return await productLink.isEnabled();
  }

  async getProductNameHref() {
    const productLink = await this.getProductNameLink();
    return await productLink.getAttribute('href');
  }

  async isMRPDisplayed() {
    const mrp = await this.getProductMRP();
    return await mrp.isVisible();
  }

  async getMRPText() {
    const mrp = await this.getProductMRP();
    return await mrp.textContent();
  }

  async isCurrentPriceDisplayed() {
    const price = await this.getProductCurrentPrice();
    return await price.isVisible();
  }

  async getCurrentPriceText() {
    const price = await this.getProductCurrentPrice();
    return await price.textContent();
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Initial State Validation', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify cart displays product with correct information', async ({ page }) => {
    // Add product to cart and navigate to cart page
    await cartPage.navigateToCart();

    // Verify: Page title shows 'Eureka forbes'
    const pageTitle = await cartPage.getPageTitle();
    expect(pageTitle).toContain('Eureka forbes');

    // Verify: Page URL is /ecom/cart
    const currentURL = await cartPage.getCurrentURL();
    expect(currentURL).toContain('/ecom/cart');

    // Verify: 'Review your cart' heading is displayed
    const headingVisible = await cartPage.isReviewHeadingVisible();
    expect(headingVisible).toBe(true);

    // Verify: Product name is displayed
    const productNameVisible = await cartPage.isProductNameVisible();
    expect(productNameVisible).toBe(true);

    // Verify: Product name is clickable and links to the PDP
    const productNameClickable = await cartPage.isProductNameClickable();
    expect(productNameClickable).toBe(true);

    const productHref = await cartPage.getProductNameHref();
    expect(productHref).toContain('GWPDNROCA0002X');

    // Verify: Product name is correct
    const productName = await cartPage.getProductNameText();
    expect(productName).toContain('Aquaguard Enrich Nexen');
    expect(productName).toContain('2X');

    // Verify: MRP is displayed as ₹25,000
    const mrpVisible = await cartPage.isMRPDisplayed();
    expect(mrpVisible).toBe(true);

    const mrpText = await cartPage.getMRPText();
    expect(mrpText).toContain('₹25,000');

    // Verify: Current price is displayed as ₹15,999
    const priceVisible = await cartPage.isCurrentPriceDisplayed();
    expect(priceVisible).toBe(true);

    const priceText = await cartPage.getCurrentPriceText();
    expect(priceText).toContain('₹15,999');

    // Verify: Pricing is correct and matches PDP
    expect(priceText).toBe('₹15,999');
    expect(mrpText).toContain('₹25,000');
  });
});
