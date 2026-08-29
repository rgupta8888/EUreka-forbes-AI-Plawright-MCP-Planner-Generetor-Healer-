/**
 * navigate-to-pdp.spec.js
 * Test: Navigate to product detail page from listing
 * 
 * This test verifies:
 * - Product Details Page (PDP) loads successfully
 * - Page URL contains product SKU: GWPDNROCA0002X
 * - Product title is displayed correctly
 * - All product images are loaded
 * - Product description section is visible
 * - Price and add to cart button are displayed
 */

const { test, expect } = require('@playwright/test');

class CategoryPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCategory() {
    await this.page.goto('https://www.eurekaforbes.com/c/water-purifiers', { waitUntil: 'domcontentloaded' });
  }

  // Use href-based selector to avoid strict mode violation
  getAquaguardEnrichNexenProduct() {
    return this.page.locator('a[href*="GWPDNROCA0002X"]').first();
  }

  async clickProductCard() {
    await this.getAquaguardEnrichNexenProduct().click({ noWaitAfter: true });
    await this.page.waitForURL(/GWPDNROCA0002X/, { waitUntil: 'commit' });
    // Wait for SPA page content to update - heading changes from 'Water Purifiers' to product name
    await expect(this.page.getByRole('heading', { level: 1 })).toContainText('Aquaguard');
  }
}

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async getProductTitle() {
    return await this.page.getByRole('heading', { level: 1 }).textContent();
  }

  async getProductPrice() {
    return await this.page.locator('text=₹15,999').first().textContent();
  }

  async getAddToCartButton() {
    return this.page.getByRole('button', { name: /Add to cart/ });
  }

  async verifyProductSKUInURL() {
    const url = this.page.url();
    return url.includes('GWPDNROCA0002X');
  }

  async verifyProductImagesLoaded() {
    const images = this.page.locator('img[alt*="PDP"]');
    const count = await images.count();
    return count > 0;
  }

  async verifyProductDescriptionVisible() {
    const description = this.page.getByText(/Aquaguard Enrich Nexen 2X RO\+UV/);
    return await description.isVisible();
  }

  async isAddToCartButtonVisible() {
    return await this.getAddToCartButton().isVisible();
  }

  async isPriceDisplayed() {
    const price = await this.page.locator('text=₹15,999').first();
    return await price.isVisible();
  }
}

// ==================== Test Suite ====================

test.describe('Product Detail Page Navigation', () => {
  let categoryPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    productPage = new ProductDetailPage(page);
  });

  test('Navigate to product detail page from listing', async ({ page }) => {
    // Step 1: Navigate to the Water Purifiers category page
    await categoryPage.navigateToCategory();

    // Step 2: From the Water Purifiers category page, click on the Aquaguard Enrich Nexen product card
    await categoryPage.clickProductCard();
    
    // Verify: Product Details Page (PDP) loads successfully
    const title = await productPage.getProductTitle();
    expect(title).toContain('Aquaguard Enrich Nexen');
    
    // Verify: Page URL contains product SKU
    const urlValid = await productPage.verifyProductSKUInURL();
    expect(urlValid).toBe(true);

    // Step 3: Verify page has loaded completely

    // Verify: All product images are loaded
    const imagesLoaded = await productPage.verifyProductImagesLoaded();
    expect(imagesLoaded).toBe(true);
    
    // Verify: Product description section is visible
    const descriptionVisible = await productPage.verifyProductDescriptionVisible();
    expect(descriptionVisible).toBe(true);
    
    // Verify: Price and add to cart button are displayed
    const priceVisible = await productPage.isPriceDisplayed();
    expect(priceVisible).toBe(true);
    
    const addToCartVisible = await productPage.isAddToCartButtonVisible();
    expect(addToCartVisible).toBe(true);
  });
});
