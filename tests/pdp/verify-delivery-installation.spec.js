/**
 * verify-delivery-installation.spec.js
 * Test: Verify Delivery & Installation section with PIN code
 * 
 * This test verifies:
 * - 'Delivery & Installation' section header is visible
 * - PIN code input textbox is present and editable
 * - 'Check' button is displayed next to the PIN code field
 * - Stock status displays: 'In stock - Free shipping & installation'
 * - PIN code is accepted in the input field
 */

const { test, expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPDP() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter');
  }

  async getPINCOdeInputField() {
    return this.page.getByPlaceholder(/Pincode|PIN|Pin code/i);
  }

  async getCheckButton() {
    return this.page.getByRole('button', { name: /Check/ });
  }

  async getDeliveryInstallationHeading() {
    return this.page.getByText('Delivery & Installation');
  }

  async getStockStatusMessage() {
    return this.page.getByText(/In stock.*Free shipping/i);
  }

  async isDeliveryInstallationSectionVisible() {
    const heading = await this.getDeliveryInstallationHeading();
    return await heading.isVisible();
  }

  async isPINCodeInputVisible() {
    const input = await this.getPINCOdeInputField();
    return await input.isVisible();
  }

  async isCheckButtonVisible() {
    const button = await this.getCheckButton();
    return await button.isVisible();
  }

  async isStockStatusVisible() {
    const status = await this.getStockStatusMessage();
    return await status.isVisible();
  }

  async enterPINCode(pinCode) {
    const input = await this.getPINCOdeInputField();
    await input.fill(pinCode);
  }

  async getPINCodeInputValue() {
    const input = await this.getPINCOdeInputField();
    return await input.inputValue();
  }

  async clickCheckButton() {
    const button = await this.getCheckButton();
    if (await button.isEnabled()) {
      await button.click();
    }
  }
}

// ==================== Test Suite ====================

test.describe('Product Details Page - Delivery & Installation', () => {
  let productPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductDetailPage(page);
  });

  test('Verify Delivery & Installation section with PIN code', async ({ page }) => {
    // Navigate to PDP
    await productPage.navigateToPDP();

    // Scroll to Delivery & Installation section
    const section = await productPage.getDeliveryInstallationHeading();
    await section.scrollIntoViewIfNeeded();

    // Verify: 'Delivery & Installation' section header is visible
    const sectionVisible = await productPage.isDeliveryInstallationSectionVisible();
    expect(sectionVisible).toBe(true);

    // Verify: PIN code input textbox is present and editable
    const pinInputVisible = await productPage.isPINCodeInputVisible();
    expect(pinInputVisible).toBe(true);

    // Verify: 'Check' button is displayed next to the PIN code field
    const checkButtonVisible = await productPage.isCheckButtonVisible();
    expect(checkButtonVisible).toBe(true);

    // Verify: Stock status displays correct message
    const stockStatusVisible = await productPage.isStockStatusVisible();
    expect(stockStatusVisible).toBe(true);

    // Test: Enter a valid PIN code in the textbox
    await productPage.enterPINCode('122003');

    // Verify: PIN code is accepted and visible in the textbox
    const pinValue = await productPage.getPINCodeInputValue();
    expect(pinValue).toBe('122003');

    // Verify: Text is visible in the textbox (confirming input works)
    const pinInput = await productPage.getPINCOdeInputField();
    const isEmpty = (await pinInput.inputValue()).length === 0;
    expect(isEmpty).toBe(false);
  });
});
