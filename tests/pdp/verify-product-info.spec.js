/**
 * verify-product-info.spec.js
 * Test: Verify PDP displays correct product information
 * 
 * This test verifies:
 * - Page title displays product name: 'Aquaguard Enrich Nexen'
 * - Product price is displayed as ₹15,999
 * - MRP shown as ₹25,000 with 36% OFF discount
 * - Full product name and features are listed
 */

const { test, expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPDP() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getProductHeading() {
    return await this.page.getByRole('heading', { level: 1 }).textContent();
  }

  async getProductPrice() {
    // Get the current selling price
    return await this.page.locator('text=/₹15,999/').first().textContent();
  }

  async getProductMRP() {
    return await this.page.getByText('MRP ₹25,000').first().textContent();
  }

  async getDiscountPercentage() {
    return await this.page.locator('text=/36% OFF/').first().textContent();
  }

  async getFullProductDescription() {
    const description = this.page.locator('text=/Aquaguard Enrich Nexen 2X RO\\+UV Active Copper Alkaline Water Purifier/');
    return await description.textContent();
  }

  async getPurificationStages() {
    // PDP shows '12-Stage Purification' (with hyphen) in product description
    return await this.page.locator('text=/12.Stage Purification/i').first().isVisible();
  }

  async getFilterLifeInfo() {
    // PDP shows '2-Year Filter Life' (with hyphen) in product description
    return await this.page.locator('text=/2.Year Filter Life/i').first().isVisible();
  }

  async getProductFeatures() {
    const features = this.page.locator('//strong[contains(text(), "Advanced")]');
    return await features.count() > 0;
  }
}

// ==================== Test Suite ====================

test.describe('Product Details Page - Product Information', () => {
  let productPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductDetailPage(page);
  });

  test('Verify PDP displays correct product information', async ({ page }) => {
    // Navigate to the Aquaguard Enrich Nexen PDP
    await productPage.navigateToPDP();

    // Verify: Page title displays product name
    const pageTitle = await productPage.getPageTitle();
    expect(pageTitle).toContain('Aquaguard Enrich Nexen');

    // Verify: Product heading
    const heading = await productPage.getProductHeading();
    expect(heading).toContain('Aquaguard Enrich Nexen');

    // Verify: Product price is displayed as ₹15,999
    const price = await productPage.getProductPrice();
    expect(price).toContain('₹15,999');

    // Verify: MRP shown as ₹25,000
    const mrp = await productPage.getProductMRP();
    expect(mrp).toContain('₹25,000');

    // Verify: 36% OFF discount is displayed
    const discount = await productPage.getDiscountPercentage();
    expect(discount).toContain('36% OFF');

    // Verify: Full product name and description
    const description = await productPage.getFullProductDescription();
    expect(description).toContain('Aquaguard Enrich Nexen 2X');
    expect(description).toContain('RO+UV');
    expect(description).toContain('Active Copper');
    expect(description).toContain('Alkaline');

    // Verify: Product features are listed
    const hasPurificationStages = await productPage.getPurificationStages();
    expect(hasPurificationStages).toBe(true);

    const hasFilterLife = await productPage.getFilterLifeInfo();
    expect(hasFilterLife).toBe(true);

    const hasFeatures = await productPage.getProductFeatures();
    expect(hasFeatures).toBe(true);
  });
});
