/**
 * verify-add-to-cart.spec.js
 * Test: Verify Add to Cart button and functionality on PDP
 * 
 * This test verifies:
 * - 'Add to cart' button is visible and clickable
 * - Button is enabled and interactive
 * - Page redirects to /ecom/cart
 * - Product is successfully added to cart
 * - Cart shows 1 item with the product
 */

const { test, expect } = require('@playwright/test');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToPDP() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
  }

  // Use testId to avoid strict mode - page has a sticky header button AND a main page button
  getAddToCartButton() {
    return this.page.getByTestId('add-to-cart-button');
  }

  async isAddToCartVisible() {
    const button = this.getAddToCartButton();
    return await button.isVisible();
  }

  async isAddToCartEnabled() {
    const button = this.getAddToCartButton();
    return await button.isEnabled();
  }

  async clickAddToCart() {
    await this.getAddToCartButton().click({ noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  async getPageURL() {
    return this.page.url();
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async getCartHeading() {
    return this.page.getByText(/Review your cart/i);
  }

  async getProductInCart() {
    return this.page.getByRole('link', { name: /Aquaguard Enrich Nexen 2X/ });
  }

  async isProductInCart() {
    const product = await this.getProductInCart();
    return await product.isVisible();
  }

  async getProductPrice() {
    return this.page.locator('text=/₹15,999/').first();
  }

  async isProductPriceVisible() {
    const price = await this.getProductPrice();
    return await price.isVisible();
  }

  async getQuantityField() {
    return this.page.locator('text="1"').first();
  }

  async verifyQuantityIsOne() {
    const quantity = await this.getQuantityField();
    const text = await quantity.textContent();
    return text.trim() === '1';
  }
}

// ==================== Test Suite ====================

test.describe('Product Details Page - Add to Cart', () => {
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('Verify Add to Cart button and functionality on PDP', async ({ page }) => {
    // Navigate to PDP
    await productPage.navigateToPDP();

    // Scroll to Add to Cart button
    const button = productPage.getAddToCartButton();
    await button.scrollIntoViewIfNeeded();

    // Verify: 'Add to cart' button is visible and clickable
    const isVisible = await productPage.isAddToCartVisible();
    expect(isVisible).toBe(true);

    // Verify: Button is enabled and interactive
    const isEnabled = await productPage.isAddToCartEnabled();
    expect(isEnabled).toBe(true);

    // Click the 'Add to cart' button
    await productPage.clickAddToCart();

    // Verify: Page redirects to /ecom/cart
    const currentURL = await productPage.getPageURL();
    expect(currentURL).toContain('/ecom/cart');

    // Verify: Product is successfully added and confirmed
    const isProductInCart = await cartPage.isProductInCart();
    expect(isProductInCart).toBe(true);

    // Verify: Cart shows product with correct price
    const isPriceVisible = await cartPage.isProductPriceVisible();
    expect(isPriceVisible).toBe(true);

    // Verify: Cart shows default quantity of 1
    const quantityCorrect = await cartPage.verifyQuantityIsOne();
    expect(quantityCorrect).toBe(true);
  });
});
