# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integration/advanced-scenario.spec.js >> Advanced Scenario - Complete E-commerce Journey >> Advanced: Multi-step user journey with multiple cart operations
- Location: tests/integration/advanced-scenario.spec.js:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Exchange applied', { exact: true })
Expected: visible
Error: strict mode violation: getByText('Exchange applied', { exact: true }) resolved to 2 elements:
    1) <p class="font-primary text-body-base  text-h-4 text-cti-primary md:text-hd-4">Exchange applied</p> aka getByTestId('review-cart').getByText('Exchange applied')
    2) <p class="font-primary text-body-base  grow text-body-base lg:text-body-lg text-green-500">Exchange applied</p> aka getByTestId('order-summary-map-item-2').getByText('Exchange applied')

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText('Exchange applied', { exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=f59e1]:
  - generic [ref=f59e2]:
    - banner:
      - navigation [ref=f59e3]:
        - generic [ref=f59e5]:
          - generic [ref=f59e6]:
            - link "Eureka forbes" [ref=f59e7] [cursor=pointer]:
              - /url: /
            - generic [ref=f59e10]:
              - link "Water Purifiers" [ref=f59e11] [cursor=pointer]:
                - /url: /c/water-purifiers
              - link "Vacuum Cleaners" [ref=f59e12] [cursor=pointer]:
                - /url: /c/vacuum-cleaners
              - link "Book Service" [ref=f59e13] [cursor=pointer]:
                - /url: /#bookService?ep=1
              - link "Air Purifiers" [ref=f59e14] [cursor=pointer]:
                - /url: /c/air-purifiers
              - link "Water Softeners" [ref=f59e15] [cursor=pointer]:
                - /url: /c/water-solutions
              - link "Service and AMC" [ref=f59e16] [cursor=pointer]:
                - /url: /customer-service-and-amc
          - generic [ref=f59e18]:
            - button "Search" [ref=f59e20] [cursor=pointer]
            - button "Cart" [ref=f59e26] [cursor=pointer]
            - link "Log in" [ref=f59e33] [cursor=pointer]:
              - /url: /login?redirectTo=/ecom/cart
    - main [ref=f59e39]:
      - generic [ref=f59e41]:
        - generic [ref=f59e42]:
          - generic [ref=f59e43]:
            - generic [ref=f59e44]: Review your cart
            - generic [ref=f59e46]:
              - link [ref=f59e47] [cursor=pointer]:
                - /url: /dp/GWPDNROCA0002X
              - generic [ref=f59e48]:
                - generic [ref=f59e49]:
                  - 'link "Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier | 2 Year Filter Life | With Mega Sediment Filter (Quantity : 2)" [ref=f59e50] [cursor=pointer]':
                    - /url: /dp/GWPDNROCA0002X
                  - generic [ref=f59e51]:
                    - generic [ref=f59e52]: ₹50,000
                    - generic [ref=f59e53]: ₹31,998
                - generic [ref=f59e55]:
                  - generic [ref=f59e56]:
                    - button [ref=f59e57] [cursor=pointer]
                    - generic [ref=f59e61]: "2"
                    - button [ref=f59e62] [cursor=pointer]
                  - button [ref=f59e66] [cursor=pointer]
                - generic [ref=f59e70]:
                  - generic [ref=f59e71]:
                    - generic [ref=f59e72]:
                      - paragraph [ref=f59e73]: Exchange applied
                      - paragraph [ref=f59e74]: For your Water Purifier
                    - generic [ref=f59e75]: ₹4,000
                  - generic [ref=f59e82]:
                    - button "Learn about checks at pickup" [ref=f59e83] [cursor=pointer]
                    - button [ref=f59e84] [cursor=pointer]
          - paragraph [ref=f59e88]: Coupons and benefits
          - button [ref=f59e89] [cursor=pointer]:
            - paragraph [ref=f59e94]: Apply Coupon
          - generic [ref=f59e98]:
            - paragraph [ref=f59e99]:
              - generic [ref=f59e104]: Bank offers (applied at payment page)
            - paragraph [ref=f59e105]: 10% instant discount on all credit/debit cards
          - separator [ref=f59e106]
          - generic [ref=f59e107]:
            - paragraph [ref=f59e108]:
              - generic [ref=f59e113]: 10% off with EMI
            - paragraph [ref=f59e114]: Instant discounts on select banks & EMI plans
          - separator [ref=f59e115]
          - generic [ref=f59e116]:
            - img "shipping-icon" [ref=f59e117]
            - paragraph [ref=f59e118]: Free shipping and installation
        - generic [ref=f59e120]:
          - generic [ref=f59e121]:
            - generic [ref=f59e122]:
              - generic [ref=f59e123]:
                - paragraph [ref=f59e124]: Total
                - paragraph [ref=f59e125]: ₹27,998
              - generic [ref=f59e126]:
                - generic [ref=f59e127]: Includes GST*
                - generic [ref=f59e128]: No-cost EMI from ₹4,667/mo
              - generic [ref=f59e129]:
                - generic [ref=f59e130]: Total Discount
                - generic [ref=f59e131]: "-₹4,000"
            - separator [ref=f59e132]
            - generic [ref=f59e133]:
              - generic [ref=f59e134]:
                - paragraph [ref=f59e135]: Order details
                - generic [ref=f59e136]:
                  - paragraph [ref=f59e137]: MRP
                  - paragraph [ref=f59e138]: ₹50,000
                - generic [ref=f59e139]:
                  - paragraph [ref=f59e140]: Subtotal
                  - paragraph [ref=f59e141]: ₹31,998
              - generic [ref=f59e142]:
                - paragraph [ref=f59e143]: Shipping worth ₹240
                - paragraph [ref=f59e144]: ₹0FREE
              - generic [ref=f59e145]:
                - paragraph [ref=f59e146]: Installation worth ₹530
                - paragraph [ref=f59e147]: ₹0FREE
              - generic [ref=f59e148]:
                - paragraph [ref=f59e149]: Exchange applied
                - paragraph [ref=f59e150]: "-₹4,000"
          - button "Continue to checkout" [ref=f59e151] [cursor=pointer]
    - contentinfo [ref=f59e152]:
      - generic [ref=f59e153]:
        - generic [ref=f59e154]:
          - generic [ref=f59e155]:
            - generic [ref=f59e156] [cursor=pointer]:
              - button [ref=f59e157]:
                - link "Water Purifiers" [ref=f59e158]:
                  - /url: /c/water-purifiers
              - generic [ref=f59e160]:
                - link "RO Water Purifiers" [ref=f59e161]:
                  - /url: /c/water-purifiers/ro-water-purifier
                - link "UV Water Purifiers" [ref=f59e162]:
                  - /url: /c/water-purifiers/uv-water-purifier
                - link "Active Copper" [ref=f59e163]:
                  - /url: /c/water-purifiers/copper-water-purifier
                - link "Alkaline Boost" [ref=f59e164]:
                  - /url: /c/water-purifiers/alkaline-boost-water-purifier
                - link "Hot & Ambient" [ref=f59e165]:
                  - /url: /c/water-purifiers/hot-and-ambient-purifier
                - link "Stainless Steel Purifier" [ref=f59e166]:
                  - /url: /c/water-purifiers/stainless-steel-purifier
                - link "Slim Water Purifier" [ref=f59e167]:
                  - /url: /c/water-purifiers/slim-water-purifier
                - link "Under Counter Purifier" [ref=f59e168]:
                  - /url: /c/water-purifiers/under-counter-purifier
                - link "Spares & Accessories" [ref=f59e169]:
                  - /url: /c/water-purifiers/water-purifier-accessories-and-spares
                - link "Genuine Filters" [ref=f59e170]:
                  - /url: /c/water-purifiers/genuine-filters
            - generic [ref=f59e171] [cursor=pointer]:
              - button [ref=f59e172]:
                - link "Vacuum cleaners" [ref=f59e173]:
                  - /url: /c/vacuum-cleaners
              - generic [ref=f59e175]:
                - link "Robotic" [ref=f59e176]:
                  - /url: /c/vacuum-cleaners/robotic-vacuum-cleaner
                - link "Upright" [ref=f59e177]:
                  - /url: /c/vacuum-cleaners/upright-vacuum-cleaner
                - link "Canister" [ref=f59e178]:
                  - /url: /c/vacuum-cleaners/canister-vacumm-cleaner
                - link "Wet & Dry" [ref=f59e179]:
                  - /url: /c/vacuum-cleaners/wet-and-dry-vacuum-cleaner
                - link "Handheld" [ref=f59e180]:
                  - /url: /c/vacuum-cleaners/handheld-vacuum-cleaner
                - link "Pet Grooming" [ref=f59e181]:
                  - /url: /c/vacuum-cleaners/pet-grooming-vacuum-cleaner
                - link "Accessories" [ref=f59e182]:
                  - /url: /c/vacuum-cleaners/vacuum-cleaners-accessories
          - generic [ref=f59e183]:
            - generic [ref=f59e184] [cursor=pointer]:
              - button [ref=f59e185]:
                - link "Water solutions" [ref=f59e186]:
                  - /url: /c/water-solutions
              - generic [ref=f59e188]:
                - link "Water Softeners" [ref=f59e189]:
                  - /url: /c/water-solutions/aquaguard-water-softeners
                - link "Sediment Filter" [ref=f59e190]:
                  - /url: /c/water-solutions/sediment-filter
                - link "Activated Carbon Filter" [ref=f59e191]:
                  - /url: /c/water-solutions/activated-carbon-filter
                - link "Iron Remover" [ref=f59e192]:
                  - /url: /c/water-solutions/iron-remover
                - link "Water Solutions Accessories" [ref=f59e193]:
                  - /url: /c/water-solutions/water-solutions-accessories
            - generic [ref=f59e194] [cursor=pointer]:
              - button [ref=f59e195]:
                - link "Commercial Water Purifiers" [ref=f59e196]:
                  - /url: /c/commercial-water-purifiers
              - generic [ref=f59e198]:
                - link "UV Commercial Water Purifier" [ref=f59e199]:
                  - /url: https://www.eurekaforbes.com/c/commercial-water-purifiers/commercial-uv-water-purifiers
                - link "RO Commercial Water Purifier" [ref=f59e200]:
                  - /url: https://www.eurekaforbes.com/c/commercial-water-purifiers/commercial-ro-water-purifier
                - link "Water Cooler with Inbuilt Purifier and Storage" [ref=f59e201]:
                  - /url: /c/commercial-water-purifiers/storage-water-cooler-with-inbuilt-purifier
                - link "RO Plants" [ref=f59e202]:
                  - /url: /c/commercial-water-purifiers/skid-mounted-ro-plants
            - generic [ref=f59e203] [cursor=pointer]:
              - button [ref=f59e204]:
                - link "Air Purifiers" [ref=f59e205]:
                  - /url: /c/air-purifiers
              - generic [ref=f59e207]:
                - link "All Air Purifiers" [ref=f59e208]:
                  - /url: /c/air-purifiers/all-air-purifiers
                - link "Filters" [ref=f59e209]:
                  - /url: /c/air-purifiers/air-purifier-filters
          - generic [ref=f59e210]:
            - generic [ref=f59e211] [cursor=pointer]:
              - button [ref=f59e212]:
                - link "Servicing" [ref=f59e213]:
                  - /url: /ecom/cart#
              - generic [ref=f59e215]:
                - link "Buy AMC" [ref=f59e216]:
                  - /url: /amc/my-devices
                - link "Raise A Complaint" [ref=f59e217]:
                  - /url: /service
                - link "AMC Terms & Conditions" [ref=f59e218]:
                  - /url: https://www.eurekaforbes.com/amc-new-terms-and-condition
            - generic [ref=f59e219] [cursor=pointer]:
              - button [ref=f59e220]:
                - link "Account" [ref=f59e221]:
                  - /url: /account
              - generic [ref=f59e223]:
                - link "Profile" [ref=f59e224]:
                  - /url: /account/profile
                - link "Your Devices" [ref=f59e225]:
                  - /url: /amc/my-devices
                - link "Your Orders" [ref=f59e226]:
                  - /url: /ecom/orders
            - generic [ref=f59e227] [cursor=pointer]:
              - button [ref=f59e228]:
                - link "Corporate Gifting" [ref=f59e229]:
                  - /url: https://www.eurekaforbes.com/corporate-gifts-and-bulk-discounts?srsltid=AfmBOoqkJujXnL70NT1d-J_OTkzRBbW2qo_qThqFguttt0VSYWUSK6Ji
              - link "Corporate Gifting & Bulk Orders" [ref=f59e232]:
                - /url: https://www.eurekaforbes.com/corporate-gifts-and-bulk-discounts?srsltid=AfmBOoqkJujXnL70NT1d-J_OTkzRBbW2qo_qThqFguttt0VSYWUSK6Ji
          - generic [ref=f59e234] [cursor=pointer]:
            - button [ref=f59e235]:
              - link "About Eureka Forbes" [ref=f59e236]:
                - /url: /ecom/cart#
            - generic [ref=f59e238]:
              - link "About Us" [ref=f59e239]:
                - /url: /about-us
              - link "Connect With Us" [ref=f59e240]:
                - /url: /connect-with-us
              - link "Investor Relations" [ref=f59e241]:
                - /url: /investor-relations
              - link "Sustainability" [ref=f59e242]:
                - /url: /sustainability
              - link "Press Release" [ref=f59e243]:
                - /url: /press-release
              - link "Authorized Service Center" [ref=f59e244]:
                - /url: /authorized-center
              - link "Office Near You" [ref=f59e245]:
                - /url: /storelocator
              - link "Blog" [ref=f59e246]:
                - /url: /blog
              - link "Book a Demo" [ref=f59e247]:
                - /url: /contactus/index/bookademorequest
              - link "Returns & Refunds Policy" [ref=f59e248]:
                - /url: /return-and-replacement-policy?srsltid=AfmBOoomc9u2-7ELXVpT9chv2zw9Op6AaxXoFZJWIfO_8OXTeIEtyc5k
              - link "Sell with EarnSmart Program" [ref=f59e249]:
                - /url: /sell-with-earnsmart
              - link "Careers" [ref=f59e250]:
                - /url: https://www.eurekaforbes.com/careers
        - generic [ref=f59e251]:
          - generic [ref=f59e252]:
            - paragraph [ref=f59e253]: Registered Office and Corporate Office
            - paragraph [ref=f59e254]: B1/B2, 701, 7th Floor, Marathon Innova, Off. Ganpatrao Kadam Marg, Lower Parel (West), Mumbai, Maharashtra – 400013
          - generic [ref=f59e255]:
            - paragraph [ref=f59e256]: Manufacturer/Importer details
            - paragraph [ref=f59e257]: Eureka Forbes Limited
          - generic [ref=f59e258]:
            - paragraph [ref=f59e259]: Corporate Identity Number (CIN)
            - paragraph [ref=f59e260]: L27310MH2008PLC188478
        - separator [ref=f59e261]
        - generic [ref=f59e262]:
          - paragraph [ref=f59e263]: More ways to shop
          - link "Call 7039883333" [ref=f59e265] [cursor=pointer]:
            - /url: tel:7039883333
        - generic [ref=f59e266]:
          - link [ref=f59e267] [cursor=pointer]:
            - /url: https://in.linkedin.com/company/eureka-forbes-ltd
            - img "LinkedIn" [ref=f59e268]
          - link [ref=f59e269] [cursor=pointer]:
            - /url: https://www.facebook.com/EurekaForbes/
            - img "Facebook" [ref=f59e270]
          - link [ref=f59e271] [cursor=pointer]:
            - /url: https://x.com/EurekaforbesIN
            - img "Twitter" [ref=f59e272]
          - link [ref=f59e273] [cursor=pointer]:
            - /url: https://www.youtube.com/c/eurekaforbes
            - img "YouTube" [ref=f59e274]
          - link [ref=f59e275] [cursor=pointer]:
            - /url: https://www.instagram.com/eurekaforbesofficial/
            - img "Instagram" [ref=f59e276]
        - generic [ref=f59e277]:
          - paragraph [ref=f59e278]: India
          - generic [ref=f59e279]:
            - paragraph [ref=f59e280]: © 2026 Eureka Forbes. All Rights Reserved.
            - generic [ref=f59e281]:
              - link "Privacy" [ref=f59e282] [cursor=pointer]:
                - /url: /en/privacy-policy
              - link "Terms of use" [ref=f59e283] [cursor=pointer]:
                - /url: /terms-of-use
              - link "Legal" [ref=f59e284] [cursor=pointer]:
                - /url: /legal
              - link "Sitemap" [ref=f59e285] [cursor=pointer]:
                - /url: /sitemap.xml
        - paragraph [ref=f59e286]: "Disclaimer: The displayed product colours and shades are indicative and cannot be considered to be a precise representation of the actual colours."
  - alert [ref=f59e287]
  - iframe [ref=f59e288]:
    - generic [ref=f65e12]:
      - 'link "4-Hour Delivery & Installation* now live for Delhi NCR Region | Order before 3PM | *T&C Apply | Note: Delivery might be delayed to High Demand" [ref=f65e13] [cursor=pointer]':
        - /url: https://www.eurekaforbes.com/c/water-purifiers/4-hour-delivery-and-installation-wp
      - link:
        - /url: https://www.eurekaforbes.com/c/water-purifiers/4-hour-delivery-and-installation-wp
```

# Test source

```ts
  1   | /**
  2   |  * advanced-scenario.spec.js
  3   |  * Advanced Test: Multi-step user journey with multiple operations
  4   |  * 
  5   |  * This test demonstrates:
  6   |  * - Complex user journey with multiple steps
  7   |  * - Proper use of all page objects
  8   |  * - Data validation at each step
  9   |  * - Exchange flow with error handling
  10  |  * - Quantity management
  11  |  * - Final verification
  12  |  * 
  13  |  * Scenario: Complete E-commerce Journey
  14  |  * 1. Browse and navigate through categories
  15  |  * 2. View product details and verify information
  16  |  * 3. Add product to cart
  17  |  * 4. Update quantity multiple times
  18  |  * 5. Apply exchange offer
  19  |  * 6. Verify pricing calculations
  20  |  * 7. Remove and reapply exchange
  21  |  * 8. Verify final state
  22  |  */
  23  | 
  24  | const { test, expect } = require('@playwright/test');
  25  | const { HomePage, CategoryPage, ProductDetailPage, CartPage } = require('../helpers/page-objects');
  26  | 
  27  | test.describe('Advanced Scenario - Complete E-commerce Journey', () => {
  28  |   let homePage;
  29  |   let categoryPage;
  30  |   let productPage;
  31  |   let cartPage;
  32  | 
  33  |   test.beforeEach(async ({ page }) => {
  34  |     homePage = new HomePage(page);
  35  |     categoryPage = new CategoryPage(page);
  36  |     productPage = new ProductDetailPage(page);
  37  |     cartPage = new CartPage(page);
  38  |   });
  39  | 
  40  |   test('Advanced: Multi-step user journey with multiple cart operations', async ({ page }) => {
  41  |     console.log('Step 1: Start journey at homepage');
  42  |     await homePage.navigateToHome();
  43  |     expect(await homePage.isWaterPurifiersLinkVisible()).toBe(true);
  44  | 
  45  |     console.log('Step 2: Navigate to Water Purifiers category');
  46  |     await homePage.navigateToWaterPurifiers();
  47  |     expect(await categoryPage.verifyProductsLoaded()).toBe(true);
  48  | 
  49  |     console.log('Step 3: Click on Aquaguard Enrich Nexen product');
  50  |     await categoryPage.clickProduct();
  51  |     expect(await productPage.verifyPDPLoaded()).toBe(true);
  52  | 
  53  |     console.log('Step 4: Verify product details');
  54  |     const title = await productPage.getProductTitle();
  55  |     expect(title).toContain('Aquaguard Enrich Nexen');
  56  | 
  57  |     const price = await productPage.getProductPrice();
  58  |     expect(price).toContain('₹15,999');
  59  | 
  60  |     const mrp = await productPage.getProductMRP();
  61  |     expect(mrp).toContain('₹25,000');
  62  | 
  63  |     console.log('Step 5: Verify delivery and exchange sections');
  64  |     expect(await productPage.verifyDeliveryInstallationSection()).toBe(true);
  65  |     expect(await productPage.getExchangeOfferMessage()).toBe(true);
  66  |     expect(await productPage.getExchangeDiscountMessage()).toBe(true);
  67  | 
  68  |     console.log('Step 6: Add product to cart');
  69  |     await productPage.clickAddToCart();
  70  |     expect(await cartPage.isProductInCart()).toBe(true);
  71  | 
  72  |     console.log('Step 7: Verify initial cart state (quantity 1)');
  73  |     // getCurrentQuantity uses positional navigation - verify qty display shows 1 via the product item
  74  |     const productItem = page.getByRole('link', { name: /Aquaguard Enrich Nexen/ }).locator('../..');
  75  |     await expect(productItem.getByText('1', { exact: true })).toBeVisible();
  76  | 
  77  |     const initialTotal = await cartPage.getTotalAmount();
  78  |     expect(initialTotal).toContain('₹15,999');
  79  | 
  80  |     console.log('Step 8: Update quantity to 2');
  81  |     await cartPage.updateQuantityTo(2);
  82  |     await expect(productItem.getByText('2', { exact: true })).toBeVisible();
  83  | 
  84  |     const totalQty2 = await cartPage.getTotalAmount();
  85  |     expect(totalQty2).toContain('₹31,998');
  86  | 
  87  |     console.log('Step 9: Apply exchange offer');
  88  |     await cartPage.applyExchange();
  89  |     expect(await cartPage.isSuccessMessageVisible()).toBe(true);
  90  |     await page.locator("//button[normalize-space()='Add to Cart With Exchange']").click();
  91  |     // Wait for the cart to update and show the exchange applied state
> 92  |     await expect(page.getByText('Exchange applied', { exact: true })).toBeVisible();
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  93  | 
  94  |     
  95  | 
  96  |     //console.log('Step 10: Verify exchange discount applied');
  97  |     //expect(await cartPage.isExchangeDiscountVisible()).toBe(true);
  98  | 
  99  |     
  100 |     const totalWithExchange = await cartPage.getTotalAmount();
  101 |     expect(totalWithExchange).toContain('₹27,998');
  102 | 
  103 |     /*console.log('Step 11: Remove exchange offer');
  104 |     // After exchange is applied, the section text changes from 'Exchange your old appliance' to 'Exchange applied'
  105 |     //const exchangeDeleteBtn = page.getByText('Exchange applied', { exact: true }).locator('../..').getByRole('button').last();
  106 |     const exchangeDeleteBtn = page.locator("//button[@data-testid='remove-item-product']").last();
  107 |     if (await exchangeDeleteBtn.isVisible()) {
  108 |       await exchangeDeleteBtn.click();
  109 |       // Wait for exchange section to revert to unselected state
  110 |       await expect(page.getByText('Exchange applied', { exact: true })).not.toBeVisible();
  111 |     }
  112 | 
  113 |     console.log('Step 12: Verify total reverts without exchange');
  114 |     expect(await cartPage.isExchangeDiscountVisible()).toBe(false);
  115 |     const totalAfterRemoval = await cartPage.getTotalAmount();
  116 |     expect(totalAfterRemoval).toContain('₹31,998');
  117 | 
  118 |     console.log('Step 13: Re-apply exchange');
  119 |     await cartPage.applyExchange();
  120 |     expect(await cartPage.isSuccessMessageVisible()).toBe(true);
  121 | 
  122 |      */
  123 |     console.log('Step 14: Verify exchange re-applied');
  124 |     const finalTotal = await cartPage.getTotalAmount();
  125 |     expect(finalTotal).toContain('₹27,998');
  126 | 
  127 |     console.log('Step 15: Verify order details');
  128 |     const subtotal = await cartPage.getSubtotalAmount();
  129 |     expect(subtotal).toContain('₹31,998');
  130 | 
  131 |     const shipping = await cartPage.getShippingCost();
  132 |     expect(shipping).toContain('₹0');
  133 |     expect(shipping).toContain('FREE');
  134 | 
  135 |     const installation = await cartPage.getInstallationCost();
  136 |     expect(installation).toContain('₹0');
  137 |     expect(installation).toContain('FREE');
  138 | 
  139 |     console.log('Step 16: Verify checkout is available');
  140 |     expect(await cartPage.isCheckoutButtonVisible()).toBe(true);
  141 | 
  142 |     console.log('✓ Journey completed successfully!');
  143 |     console.log('Summary:');
  144 |     console.log('- Product: Aquaguard Enrich Nexen 2X');
  145 |     console.log('- Quantity: 2');
  146 |     console.log('- Exchange Discount: ₹4000');
  147 |     console.log('- Final Total: ₹27,998');
  148 |     
  149 |   });
  150 | });
  151 | 
```