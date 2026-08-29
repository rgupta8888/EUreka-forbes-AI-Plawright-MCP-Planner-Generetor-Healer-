/**
 * verify-order-details.spec.js
 * Test: Verify order details and total calculation
 * 
 * This test verifies:
 * - Order details section header is visible
 * - MRP label is displayed with value ₹25,000
 * - Subtotal label and value ₹15,999 (qty 1 × ₹15,999)
 * - Shipping line shows 'Shipping worth ₹240'
 * - Shipping discount shows '₹0 FREE'
 * - Installation line shows 'Installation worth ₹530'
 * - Installation discount shows '₹0 FREE'
 * - Total label is displayed
 * - Total value shows ₹15,999
 * - 'Includes GST*' text is displayed
 * - 'No-cost EMI from ₹2,667/mo' is shown
 */

const { test, expect } = require('@playwright/test');
const { CartPage } = require('../helpers/page-objects');

test.describe('Cart Page - Order Details Verification', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
  });

  test('Verify order details and total calculation', async ({ page }) => {
    // Add product to cart
    await page.goto('https://www.eurekaforbes.com/dp/GWPDNROCA0002X/aquaguard-enrich-nexen-2-x-ro-uv-active-copper-alkaline-water-purifier-2-year-filter-life-with-mega-sediment-filter', { waitUntil: 'domcontentloaded' });
    const addToCartBtn = page.getByTestId('add-to-cart-button');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click({ noWaitAfter: true });
    await expect(page.getByText('Review your cart')).toBeVisible();

    // Scroll to Order details section
    const orderDetailsHeading = page.getByText(/Order details/i);
    await orderDetailsHeading.scrollIntoViewIfNeeded();

    // Verify: Order details section header is visible
    expect(await orderDetailsHeading.isVisible()).toBe(true);

    // Verify: MRP label is displayed
    const mrpLabel = page.getByText(/^MRP$/);
    expect(await mrpLabel.isVisible()).toBe(true);

    // Verify: MRP value shows ₹25,000
    const mrpValue = page.locator('text=/MRP/').locator('..').locator('text=/₹25,000/');
    expect(await mrpValue.isVisible()).toBe(true);

    // Verify: Subtotal label is displayed
    const subtotalLabel = page.getByText(/^Subtotal$/);
    expect(await subtotalLabel.isVisible()).toBe(true);

    // Verify: Subtotal value shows ₹15,999
    const subtotalValue = page.locator('text=/Subtotal/').locator('..').locator('text=/₹15,999/');
    expect(await subtotalValue.isVisible()).toBe(true);

    // Verify: Shipping line shows 'Shipping worth ₹240'
    const shippingLine = page.locator('text=/Shipping worth ₹240/');
    expect(await shippingLine.isVisible()).toBe(true);

    // Verify: Shipping discount shows '₹0 FREE'
    const shippingDiscount = page.locator('text=/Shipping/').locator('..').locator('text=/₹0.*FREE/');
    expect(await shippingDiscount.isVisible()).toBe(true);

    // Verify: Installation line shows 'Installation worth ₹530'
    const installationLine = page.locator('text=/Installation worth ₹530/');
    expect(await installationLine.isVisible()).toBe(true);

    // Verify: Installation discount shows '₹0 FREE'
    const installationDiscount = page.locator('text=/Installation/').locator('..').locator('text=/₹0.*FREE/');
    expect(await installationDiscount.isVisible()).toBe(true);

    // Verify: Total label is displayed
    const totalLabel = page.getByText(/^Total$/);
    expect(await totalLabel.isVisible()).toBe(true);

    // Verify: Total value shows ₹15,999
    const totalValue = page.locator('text=/^Total$/').locator('..').locator('text=/₹15,999/');
    expect(await totalValue.isVisible()).toBe(true);

    // Verify: 'Includes GST*' text is displayed
    const gstText = page.getByText(/Includes GST/i);
    expect(await gstText.isVisible()).toBe(true);

    // Verify: 'No-cost EMI' text is shown
    const emiText = page.getByText(/No-cost EMI.*₹2,667/i);
    expect(await emiText.isVisible()).toBe(true);
  });
});
