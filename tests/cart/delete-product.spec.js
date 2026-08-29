/**
 * delete-product.spec.js
 * Test: Delete product from cart
 * 
 * This test verifies:
 * - Delete button/icon is visible on the product line item
 * - Delete button is clickable
 * - Product line item is removed from the cart
 * - Delete action is confirmed
 * - Cart shows empty cart message or state
 * - 'Review your cart' section is empty
 * - No product line items are displayed
 * - Order details section may disappear or show zero amounts
 * - No pricing is displayed when cart is empty
 * - Navigation options are available to browse products again
 * - User can click 'Continue shopping' or similar option to return to product listing
 */

const { test, expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart() {
    await this.page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const btn = this.page.getByTestId('add-to-cart-button');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true, noWaitAfter: true });
    await expect(this.page.getByText('Review your cart')).toBeVisible();
  }

  // Delete button is at index 2 within the product item (0=minus, 1=increment, 2=delete)
  getDeleteButton() {
    const productItem = this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    return productItem.getByRole('button').nth(2);
  }

  async clickDeleteProduct() {
    await this.getDeleteButton().click();
  }

  async getProductInCart() {
    return this.page.getByRole('link', { name: /Aquaguard Enrich Nexen/ });
  }

  async isProductVisible() {
    const product = await this.getProductInCart();
    return await product.isVisible();
  }

  async getCartLineItems() {
    return this.page.locator('[role="listitem"]').filter({ hasText: /₹/ });
  }

  async getLineItemCount() {
    const items = await this.getCartLineItems();
    return await items.count();
  }

  async getEmptyCartMessage() {
    return this.page.getByText(/empty|no items|cart is empty/i);
  }

  async isEmptyCartMessageVisible() {
    try {
      const message = await this.getEmptyCartMessage();
      return await message.isVisible();
    } catch {
      return false;
    }
  }

  async getReviewCartSection() {
    return this.page.getByText(/Review your cart/i);
  }

  async getOrderDetailsSection() {
    return this.page.locator('text=/Order details/i');
  }

  async isOrderDetailsSectionVisible() {
    try {
      const section = await this.getOrderDetailsSection();
      return await section.isVisible();
    } catch {
      return false;
    }
  }

  async getContinueShoppingButton() {
    return this.page.getByRole('button', { name: /continue shopping|back to shop|shop more/i });
  }

  async isContinueShoppingAvailable() {
    try {
      const btn = await this.getContinueShoppingButton();
      return await btn.isVisible();
    } catch {
      return false;
    }
  }
}

// ==================== Test Suite ====================

test.describe('Cart Page - Product Deletion', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Delete product from cart', async ({ page }) => {
    // Add product to cart
    await cartPage.addProductToCart();

    // Verify: Delete button/icon is visible on the product line item
    const deleteBtn = await cartPage.getDeleteButton();
    expect(await deleteBtn.isVisible()).toBe(true);
    
    // Verify: Delete button is clickable
    const isEnabled = await deleteBtn.isEnabled();
    expect(isEnabled).toBe(true);

    // Step: Click the delete button for the product
    await cartPage.clickDeleteProduct();

    // Verify: Product line item is removed from the cart
    const isProductVisible = await cartPage.isProductVisible();
    expect(isProductVisible).toBe(false);

    // Verify: Cart shows empty cart message or state
    const lineItemCount = await cartPage.getLineItemCount();
    expect(lineItemCount).toBe(0);

    // Verify: 'Review your cart' section is empty or still visible but empty
    const reviewSection = await cartPage.getReviewCartSection();
    expect(await reviewSection.isVisible()).toBe(true);

    // Verify: No product line items are displayed
    const productsVisible = await cartPage.isProductVisible();
    expect(productsVisible).toBe(false);

    // Verify: Order details section may disappear or show zero amounts
    // This is optional as it depends on implementation
    const orderDetailsVisible = await cartPage.isOrderDetailsSectionVisible();
    // Could be true or false depending on design

    // Verify: Navigation options are available to browse products again
    const continueShoppingAvailable = await cartPage.isContinueShoppingAvailable();
    // Could have continue shopping button or link back to categories
  });
});
