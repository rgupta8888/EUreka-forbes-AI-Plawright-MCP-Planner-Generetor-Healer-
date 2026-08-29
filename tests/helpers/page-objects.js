const { expect } = require('@playwright/test');

// ==================== BasePage ====================

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async getPageTitle() {
    return await this.page.title();
  }
}

// ==================== HomePage ====================

class HomePage extends BasePage {
  async navigateToHome() {
    await this.page.goto('https://www.eurekaforbes.com/', { waitUntil: 'domcontentloaded' });
  }

  // Use href selector to avoid strict mode - homepage has multiple links with 'Water Purifiers' text
  getWaterPurifiersLink() {
    return this.page.locator('a[href="/c/water-purifiers"]').first();
  }

  async navigateToWaterPurifiers() {
    await this.page.goto('https://www.eurekaforbes.com/c/water-purifiers', { waitUntil: 'domcontentloaded' });
  }

  getCartButton() {
    return this.page.getByRole('button', { name: /Cart/ });
  }

  getSearchButton() {
    return this.page.getByRole('button', { name: /Search/ });
  }

  getLoginLink() {
    return this.page.getByRole('link', { name: /Log in/ });
  }

  async isWaterPurifiersLinkVisible() {
    return await this.getWaterPurifiersLink().isVisible();
  }
}

// ==================== CategoryPage ====================

class CategoryPage extends BasePage {
  async navigateToCategory() {
    await this.page.goto('https://www.eurekaforbes.com/c/water-purifiers', { waitUntil: 'domcontentloaded' });
  }

  // Use href-based selector to avoid strict mode - multiple product cards match the name pattern
  getAquaguardEnrichNexenProduct() {
    return this.page.locator('a[href*="GWPDNROCA0002X"]').first();
  }

  async clickProduct() {
    await this.getAquaguardEnrichNexenProduct().click({ noWaitAfter: true });
    await this.page.waitForURL(/GWPDNROCA0002X/, { waitUntil: 'commit' });
    // Wait for SPA page content to switch from category heading to product heading
    await expect(this.page.getByRole('heading', { level: 1 })).toContainText('Aquaguard');
  }

  async getPageHeading() {
    return await this.page.getByRole('heading', { level: 1 }).textContent();
  }

  // Use getByRole to match implicit ARIA role of <li> elements
  async verifyProductsLoaded() {
    return await this.page.getByRole('listitem').count() > 0;
  }

  getProductByName(productName) {
    return this.page.getByRole('link', { name: new RegExp(productName, 'i') });
  }
}

// ==================== ProductDetailPage ====================

class ProductDetailPage extends BasePage {
  async navigateToPDP() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
  }

  // Use testId to avoid strict mode - page has a sticky header button AND a main page button
  getAddToCartButton() {
    return this.page.getByTestId('add-to-cart-button');
  }

  async clickAddToCart() {
    // noWaitAfter skips post-click navigation wait — Next.js SPA routing doesn't fire 'load' event
    const btn = this.getAddToCartButton();
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async getProductTitle() {
    return await this.page.getByRole('heading', { level: 1 }).textContent();
  }

  async getProductPrice() {
    return await this.page.locator('text=/₹15,999/').first().textContent();
  }

  async getProductMRP() {
    return await this.page.getByText('MRP ₹25,000').first().textContent();
  }

  async getDiscountPercentage() {
    return await this.page.locator('text=/36% OFF/').first().textContent();
  }

  getPINCOdeInputField() {
    return this.page.getByPlaceholder(/Pincode|PIN|Pin code/i);
  }

  async enterPINCode(pinCode) {
    const input = this.getPINCOdeInputField();
    await input.fill(pinCode);
  }

  getCheckButton() {
    return this.page.getByRole('button', { name: /Check/ });
  }

  getExchangeSelectButton() {
    return this.page.getByRole('button', { name: /Select/i }).first();
  }

  getExchangeLearnMoreButton() {
    return this.page.getByRole('button', { name: /Learn more/i });
  }

  async getExchangeOfferMessage() {
    return await this.page.getByText(/Exchange ANY old appliance/i).isVisible();
  }

  async getExchangeDiscountMessage() {
    return await this.page.getByText(/Get upto ₹4000 OFF/i).isVisible();
  }

  async verifyPDPLoaded() {
    const title = await this.getProductTitle();
    return title && title.includes('Aquaguard Enrich Nexen');
  }

  async verifyDeliveryInstallationSection() {
    const heading = this.page.getByText('Delivery & Installation');
    return await heading.isVisible();
  }

  async verifyStockStatus() {
    const status = this.page.getByText(/In stock.*Free shipping/i);
    return await status.isVisible();
  }
}

// ==================== CartPage ====================

class CartPage extends BasePage {
  async navigateToCart() {
    await this.page.goto('https://www.eurekaforbes.com/ecom/cart', { waitUntil: 'domcontentloaded' });
  }

  getProductInCart() {
    return this.page.getByRole('link', { name: /Aquaguard Enrich Nexen 2X/ });
  }

  async isProductInCart() {
    return await this.getProductInCart().isVisible();
  }

  async getReviewCartHeading() {
    return await this.page.getByText(/Review your cart/i).isVisible();
  }

  async getProductPrice() {
    return await this.page.locator('text=/₹15,999/').first().textContent();
  }

  async getProductMRP() {
    return await this.page.locator('text=/₹25,000/').first().textContent();
  }

  getQuantityField() {
    return this.page.locator('text="1"').first();
  }

  async getCurrentQuantity() {
    const quantityDisplay = this.page.locator('[role="generic"]').filter({ hasText: /^[0-9]$/ });
    return await quantityDisplay.first().textContent();
  }

  async updateQuantityTo(targetQuantity) {
    // Increment button is at index 1 within the product item (0=minus, 1=increment, 2=delete, 3=Select, 4=Learn more)
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    const incrementBtn = productItem.getByRole('button').nth(1);
    for (let i = 1; i < targetQuantity; i++) {
      await incrementBtn.click();
    }
  }

  // Delete button is at index 2 within the product item container (0=minus, 1=increment, 2=delete)
  getDeleteButton() {
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    return productItem.getByRole('button').nth(2);
  }

  async deleteProduct() {
    await this.getDeleteButton().click();
  }

  getExchangeSelectButton() {
    return this.page.getByRole('button', { name: /Select/i }).first();
  }

  async getSubtotalAmount() {
    const line = this.page.locator('text=/Subtotal/').locator('..');
    return await line.locator('text=/₹/').textContent();
  }

  async getTotalAmount() {
    const line = this.page.locator('text=/^Total$/').locator('..');
    return await line.locator('text=/₹/').textContent();
  }

  async getShippingCost() {
    const line = this.page.locator('text=/Shipping/').locator('..');
    return await line.textContent();
  }

  async getInstallationCost() {
    const line = this.page.locator('text=/Installation/').locator('..');
    return await line.textContent();
  }

  async applyExchange() {
    // Step 1: Open exchange modal
    await this.getExchangeSelectButton().click();

    // Step 2: Select Water Purifiers category inside the modal
    // The modal uses data-testid="modal-container" - scope clicks to modal to avoid hitting nav links
    const modal = this.page.locator('[data-testid="modal-container"]');
    await modal.waitFor({ state: 'visible' });
    const waterPurifierOption = modal.getByText(/Water Purifier/i).first();
    await waterPurifierOption.click();

    // Step 3: Continue to PIN entry
    const continueBtn = this.page.getByRole('button', { name: /Continue with exchange/i });
    await continueBtn.waitFor({ state: 'visible' });
    await continueBtn.click();

    // Step 4: Enter PIN code
    const pinInput = this.page.getByPlaceholder(/Pincode|PIN/i);
    await pinInput.waitFor({ state: 'visible' });
    await pinInput.fill('122003');

    // Step 5: Validate PIN — scope to the exchange modal to avoid matching 'Continue to checkout'
    const exchangeModal = this.page.getByTestId('modal');
    const checkBtn = exchangeModal.getByRole('button', { name: 'Check', exact: true });
    await expect(checkBtn).toBeEnabled();
    await checkBtn.click();

    // Step 6: Apply the exchange discount — use testId to avoid matching 'Apply Coupon' on the cart page
    const confirmBtn = this.page.getByTestId('confirm-button');
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
  }



  async getSuccessMessage() {
    return this.page.getByText(/Exchange applied.*You saved ₹4000/i);
  }

  async isSuccessMessageVisible() {
    try {
      const message = await this.getSuccessMessage();
      return await message.isVisible();
    } catch {
      return false;
    }
  }

  async isEmptyCart() {
    const lineItems = this.page.locator('[role="listitem"]').filter({ hasText: /₹/ });
    return await lineItems.count() === 0;
  }

  getCheckoutButton() {
    return this.page.getByRole('button', { name: /Continue to checkout/i });
  }

  async isCheckoutButtonVisible() {
    return await this.getCheckoutButton().isVisible();
  }

  async getExchangeDiscountLine() {
    return this.page.getByText('Exchange applied', { exact: true });
  }

  async isExchangeDiscountVisible() {
    return await this.page.getByText('Exchange applied', { exact: true }).isVisible().catch(() => false);
  }
}

// ==================== Exports ====================

module.exports = {
  BasePage,
  HomePage,
  CategoryPage,
  ProductDetailPage,
  CartPage
};
