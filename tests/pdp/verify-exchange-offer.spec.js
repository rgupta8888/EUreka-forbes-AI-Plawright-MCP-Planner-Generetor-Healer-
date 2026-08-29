/**
 * verify-exchange-offer.spec.js
 * Test: Verify exchange offer section on PDP
 * 
 * This test verifies:
 * - 'Ways to buy' heading is visible
 * - Exchange offer section is displayed with label 'WEB EXCLUSIVE'
 * - Message: 'Exchange ANY old appliance for discounts on a new device!'
 * - 'Select' button is present and clickable
 * - Message 'Get upto ₹4000 OFF' is displayed
 * - 'Learn more' button is visible
 * - Bank offers and EMI information are displayed
 */

const { test, expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPDP() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
  }

  async getWaysToByHeading() {
    return this.page.getByRole('heading', { name: /Ways to buy/i });
  }

  async getExchangeSelectButton() {
    return this.page.getByRole('button', { name: /Select/i }).first();
  }

  async getExchangeLearnMoreButton() {
    return this.page.getByRole('button', { name: /Learn more/i });
  }

  async getExchangeOfferMessage() {
    return this.page.getByText(/Exchange ANY old appliance/i);
  }

  async getExchangeDiscountText() {
    return this.page.getByText(/Get upto ₹4000 OFF/i);
  }

  async getWebExclusiveLabel() {
    return this.page.getByText(/WEB EXCLUSIVE/i);
  }

  async getBankOffersText() {
    return this.page.getByText(/10% instant discount on all credit.debit cards/i);
  }

  async getEMIPlansText() {
    return this.page.getByText(/No-cost EMI plans/i);
  }

  async isWaysToByVisible() {
    const heading = await this.getWaysToByHeading();
    return await heading.isVisible();
  }

  async isExchangeMessageVisible() {
    const message = await this.getExchangeOfferMessage();
    return await message.isVisible();
  }

  async isSelectButtonVisible() {
    const button = await this.getExchangeSelectButton();
    return await button.isVisible();
  }

  async isExchangeDiscountVisible() {
    const discount = await this.getExchangeDiscountText();
    return await discount.isVisible();
  }

  async isLearnMoreVisible() {
    const button = await this.getExchangeLearnMoreButton();
    return await button.isVisible();
  }

  async isBankOffersVisible() {
    const offers = await this.getBankOffersText();
    return await offers.isVisible();
  }

  async isEMIPlansVisible() {
    const plans = await this.getEMIPlansText();
    return await plans.isVisible();
  }

  async isWebExclusiveVisible() {
    const label = await this.getWebExclusiveLabel();
    return await label.isVisible();
  }
}

// ==================== Test Suite ====================

test.describe('Product Details Page - Exchange Offer', () => {
  let productPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductDetailPage(page);
  });

  test('Verify exchange offer section on PDP', async ({ page }) => {
    // Navigate to PDP
    await productPage.navigateToPDP();

    // Scroll to Ways to buy section
    const heading = await productPage.getWaysToByHeading();
    await heading.scrollIntoViewIfNeeded();

    // Verify: 'Ways to buy' heading is visible
    const waysToByVisible = await productPage.isWaysToByVisible();
    expect(waysToByVisible).toBe(true);

    // Verify: Exchange offer section is displayed with label 'WEB EXCLUSIVE'
    const webExclusiveVisible = await productPage.isWebExclusiveVisible();
    expect(webExclusiveVisible).toBe(true);

    // Verify: Message displayed
    const messageVisible = await productPage.isExchangeMessageVisible();
    expect(messageVisible).toBe(true);

    // Verify: 'Select' button is present and clickable
    const selectButtonVisible = await productPage.isSelectButtonVisible();
    expect(selectButtonVisible).toBe(true);

    const selectButton = await productPage.getExchangeSelectButton();
    const isEnabled = await selectButton.isEnabled();
    expect(isEnabled).toBe(true);

    // Verify: Message 'Get upto ₹4000 OFF' is displayed
    const discountVisible = await productPage.isExchangeDiscountVisible();
    expect(discountVisible).toBe(true);

    // Verify: 'Learn more' button is visible
    const learnMoreVisible = await productPage.isLearnMoreVisible();
    expect(learnMoreVisible).toBe(true);

    // Verify: Bank offers section
    const bankOffersVisible = await productPage.isBankOffersVisible();
    expect(bankOffersVisible).toBe(true);

    // Verify: EMI plans are displayed
    const emiPlansVisible = await productPage.isEMIPlansVisible();
    expect(emiPlansVisible).toBe(true);
  });
});
