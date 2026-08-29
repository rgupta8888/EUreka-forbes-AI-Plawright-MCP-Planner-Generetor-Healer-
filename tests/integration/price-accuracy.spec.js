/**
 * price-accuracy.spec.js
 * Test: Verify price accuracy across different paths
 * 
 * This comprehensive integration test verifies:
 * - Price shown on category listing page
 * - Price shown on PDP
 * - Price shown in cart
 * - Subtotal calculation with quantity 2
 * - Exchange discount calculation
 * - Final total calculation
 * 
 * Ensures price consistency across the entire user journey
 */

const { test, expect } = require('@playwright/test');
const { HomePage, CategoryPage, ProductDetailPage, CartPage } = require('../helpers/page-objects');

test.describe('Integration Tests - Price Accuracy', () => {
  let homePage;
  let categoryPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    productPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('Price accuracy across different paths', async ({ page }) => {
    // Step 1: View Aquaguard Enrich Nexen on category listing page
    await homePage.navigateToHome();
    await homePage.navigateToWaterPurifiers();

    // Expected price on category page: ₹15,999 MRP ₹25,000
    const categoryProduct = categoryPage.getAquaguardEnrichNexenProduct();
    const categoryProductCard = categoryProduct.locator('..');
    
    const categoryPrice = categoryProductCard.locator('text=/₹15,999/');
    expect(await categoryPrice.isVisible()).toBe(true);

    const categoryMRP = categoryProductCard.locator('text=/MRP.*₹25,000|₹25,000/');
    expect(await categoryMRP.isVisible()).toBe(true);

    // Step 2: Click product to open PDP
    await categoryPage.clickProduct();

    // Verify: PDP shows same price: ₹15,999 MRP ₹25,000
    const pdpPrice = await productPage.getProductPrice();
    expect(pdpPrice).toContain('₹15,999');

    const pdpMRP = await productPage.getProductMRP();
    expect(pdpMRP).toContain('₹25,000');

    // Step 3: Add to cart and view in cart
    await productPage.clickAddToCart();

    // Verify: Cart displays same price: ₹15,999 MRP ₹25,000
    const cartPrice = await cartPage.getProductPrice();
    expect(cartPrice).toContain('₹15,999');

    const cartMRP = await cartPage.getProductMRP();
    expect(cartMRP).toContain('₹25,000');

    // Step 4: Update quantity to 2
    await cartPage.updateQuantityTo(2);

    // Verify: Subtotal: ₹31,998 (2 × ₹15,999)
    const subtotal = await cartPage.getSubtotalAmount();
    expect(subtotal).toContain('₹31,998');

    // Step 5: Apply exchange discount
    await cartPage.applyExchange();

    // Verify: Exchange discount: ₹4000
    const isExchangeVisible = await cartPage.isExchangeDiscountVisible();
    expect(isExchangeVisible).toBe(true);

    // Step 6: Verify final total calculation
    // Total = ₹31,998 - ₹4000 = ₹27,998
    const finalTotal = await cartPage.getTotalAmount();
    expect(finalTotal).toContain('₹27,998');

    // Summary verification
    expect(subtotal).toContain('₹31,998'); // Subtotal for qty 2
    expect(finalTotal).toContain('₹27,998'); // Total with exchange
  });
});
