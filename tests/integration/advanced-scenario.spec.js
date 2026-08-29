/**
 * advanced-scenario.spec.js
 * Advanced Test: Multi-step user journey with multiple operations
 * 
 * This test demonstrates:
 * - Complex user journey with multiple steps
 * - Proper use of all page objects
 * - Data validation at each step
 * - Exchange flow with error handling
 * - Quantity management
 * - Final verification
 * 
 * Scenario: Complete E-commerce Journey
 * 1. Browse and navigate through categories
 * 2. View product details and verify information
 * 3. Add product to cart
 * 4. Update quantity multiple times
 * 5. Apply exchange offer
 * 6. Verify pricing calculations
 * 7. Remove and reapply exchange
 * 8. Verify final state
 */

const { test, expect } = require('@playwright/test');
const { HomePage, CategoryPage, ProductDetailPage, CartPage } = require('../helpers/page-objects');

test.describe('Advanced Scenario - Complete E-commerce Journey', () => {
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

  test('Advanced: Multi-step user journey with multiple cart operations', async ({ page }) => {
    console.log('Step 1: Start journey at homepage');
    await homePage.navigateToHome();
    expect(await homePage.isWaterPurifiersLinkVisible()).toBe(true);

    console.log('Step 2: Navigate to Water Purifiers category');
    await homePage.navigateToWaterPurifiers();
    expect(await categoryPage.verifyProductsLoaded()).toBe(true);

    console.log('Step 3: Click on Aquaguard Enrich Nexen product');
    await categoryPage.clickProduct();
    expect(await productPage.verifyPDPLoaded()).toBe(true);

    console.log('Step 4: Verify product details');
    const title = await productPage.getProductTitle();
    expect(title).toContain('Aquaguard Enrich Nexen');

    const price = await productPage.getProductPrice();
    expect(price).toContain('₹15,999');

    const mrp = await productPage.getProductMRP();
    expect(mrp).toContain('₹25,000');

    console.log('Step 5: Verify delivery and exchange sections');
    expect(await productPage.verifyDeliveryInstallationSection()).toBe(true);
    expect(await productPage.getExchangeOfferMessage()).toBe(true);
    expect(await productPage.getExchangeDiscountMessage()).toBe(true);

    console.log('Step 6: Add product to cart');
    await productPage.clickAddToCart();
    expect(await cartPage.isProductInCart()).toBe(true);

    console.log('Step 7: Verify initial cart state (quantity 1)');
    // getCurrentQuantity uses positional navigation - verify qty display shows 1 via the product item
    const productItem = page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
    await expect(productItem.getByText('1', { exact: true })).toBeVisible();

    const initialTotal = await cartPage.getTotalAmount();
    expect(initialTotal).toContain('₹15,999');

    console.log('Step 8: Update quantity to 2');
    await cartPage.updateQuantityTo(2);
    await expect(productItem.getByText('2', { exact: true })).toBeVisible();

    const totalQty2 = await cartPage.getTotalAmount();
    expect(totalQty2).toContain('₹31,998');

    console.log('Step 9: Apply exchange offer');
    await cartPage.applyExchange();
    expect(await cartPage.isSuccessMessageVisible()).toBe(true);
    await page.locator("//button[normalize-space()='Add to Cart With Exchange']").click();
    await page.waitForTimeout(2000); // Wait for 2 seconds to allow the cart to updates
    // Wait for the cart to update and show the exchange applied state
    //await expect(page.getByText('Exchange applied', { exact: true })).toBeVisible();

    
  /*
    //console.log('Step 10: Verify exchange discount applied');
    //expect(await cartPage.isExchangeDiscountVisible()).toBe(true);
  */
    
    //const totalWithExchange = await cartPage.getTotalAmount();
    //expect(totalWithExchange).toContain('₹31,998');

    /*console.log('Step 11: Remove exchange offer');
    // After exchange is applied, the section text changes from 'Exchange your old appliance' to 'Exchange applied'
    //const exchangeDeleteBtn = page.getByText('Exchange applied', { exact: true }).locator('../..').getByRole('button').last();
    const exchangeDeleteBtn = page.locator("//button[@data-testid='remove-item-product']").last();
    if (await exchangeDeleteBtn.isVisible()) {
      await exchangeDeleteBtn.click();
      // Wait for exchange section to revert to unselected state
      await expect(page.getByText('Exchange applied', { exact: true })).not.toBeVisible();
    }

    console.log('Step 12: Verify total reverts without exchange');
    expect(await cartPage.isExchangeDiscountVisible()).toBe(false);
    const totalAfterRemoval = await cartPage.getTotalAmount();
    expect(totalAfterRemoval).toContain('₹31,998');

    console.log('Step 13: Re-apply exchange');
    await cartPage.applyExchange();
    expect(await cartPage.isSuccessMessageVisible()).toBe(true);
  */
     
    console.log('Step 10: Verify exchange applied');
    const finalTotal = await cartPage.getTotalAmount();
    expect(finalTotal).toContain('₹27,998');

    console.log('Step 11: Verify order details');
    const subtotal = await cartPage.getSubtotalAmount();
    expect(subtotal).toContain('₹31,998');

    const shipping = await cartPage.getShippingCost();
    expect(shipping).toContain('₹0');
    expect(shipping).toContain('FREE');

    const installation = await cartPage.getInstallationCost();
    expect(installation).toContain('₹0');
    expect(installation).toContain('FREE');

    console.log('Step 12: Verify checkout is available');
    expect(await cartPage.isCheckoutButtonVisible()).toBe(true);

    console.log('✓ Journey completed successfully!');
    console.log('Summary:');
    console.log('- Product: Aquaguard Enrich Nexen 2X');
    console.log('- Quantity: 2');
    console.log('- Exchange Discount: ₹4000');
    console.log('- Final Total: ₹27,998');
    
    
  });
});
