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
- generic [active] [ref=f60e1]:
  - generic [ref=f60e2]:
    - banner:
      - navigation [ref=f60e3]:
        - generic [ref=f60e5]:
          - generic [ref=f60e6]:
            - link "Eureka forbes" [ref=f60e7] [cursor=pointer]:
              - /url: /
            - generic [ref=f60e10]:
              - link "Water Purifiers" [ref=f60e11] [cursor=pointer]:
                - /url: /c/water-purifiers
              - link "Vacuum Cleaners" [ref=f60e12] [cursor=pointer]:
                - /url: /c/vacuum-cleaners
              - link "Book Service" [ref=f60e13] [cursor=pointer]:
                - /url: /#bookService?ep=1
              - link "Air Purifiers" [ref=f60e14] [cursor=pointer]:
                - /url: /c/air-purifiers
              - link "Water Softeners" [ref=f60e15] [cursor=pointer]:
                - /url: /c/water-solutions
              - link "Service and AMC" [ref=f60e16] [cursor=pointer]:
                - /url: /customer-service-and-amc
          - generic [ref=f60e18]:
            - button "Search" [ref=f60e20] [cursor=pointer]
            - button "Cart" [ref=f60e26] [cursor=pointer]
            - link "Log in" [ref=f60e33] [cursor=pointer]:
              - /url: /login?redirectTo=/ecom/cart
    - main [ref=f60e39]:
      - generic [ref=f60e41]:
        - generic [ref=f60e42]:
          - generic [ref=f60e43]:
            - generic [ref=f60e44]: Review your cart
            - generic [ref=f60e46]:
              - link [ref=f60e47] [cursor=pointer]:
                - /url: /dp/GWPDNROCA0002X
              - generic [ref=f60e48]:
                - generic [ref=f60e49]:
                  - 'link "Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier | 2 Year Filter Life | With Mega Sediment Filter (Quantity : 2)" [ref=f60e50] [cursor=pointer]':
                    - /url: /dp/GWPDNROCA0002X
                  - generic [ref=f60e51]:
                    - generic [ref=f60e52]: ₹50,000
                    - generic [ref=f60e53]: ₹31,998
                - generic [ref=f60e55]:
                  - generic [ref=f60e56]:
                    - button [ref=f60e57] [cursor=pointer]
                    - generic [ref=f60e61]: "2"
                    - button [ref=f60e62] [cursor=pointer]
                  - button [ref=f60e66] [cursor=pointer]
                - generic [ref=f60e70]:
                  - generic [ref=f60e71]:
                    - generic [ref=f60e72]:
                      - paragraph [ref=f60e73]: Exchange applied
                      - paragraph [ref=f60e74]: For your Water Purifier
                    - generic [ref=f60e75]: ₹4,000
                  - generic [ref=f60e82]:
                    - button "Learn about checks at pickup" [ref=f60e83] [cursor=pointer]
                    - button [ref=f60e84] [cursor=pointer]
          - paragraph [ref=f60e88]: Coupons and benefits
          - button [ref=f60e89] [cursor=pointer]:
            - paragraph [ref=f60e94]: Apply Coupon
          - generic [ref=f60e98]:
            - paragraph [ref=f60e99]:
              - generic [ref=f60e104]: Bank offers (applied at payment page)
            - paragraph [ref=f60e105]: 10% instant discount on all credit/debit cards
          - separator [ref=f60e106]
          - generic [ref=f60e107]:
            - paragraph [ref=f60e108]:
              - generic [ref=f60e113]: 10% off with EMI
            - paragraph [ref=f60e114]: Instant discounts on select banks & EMI plans
          - separator [ref=f60e115]
          - generic [ref=f60e116]:
            - img "shipping-icon" [ref=f60e117]
            - paragraph [ref=f60e118]: Free shipping and installation
        - generic [ref=f60e120]:
          - generic [ref=f60e121]:
            - generic [ref=f60e122]:
              - generic [ref=f60e123]:
                - paragraph [ref=f60e124]: Total
                - paragraph [ref=f60e125]: ₹27,998
              - generic [ref=f60e126]:
                - generic [ref=f60e127]: Includes GST*
                - generic [ref=f60e128]: No-cost EMI from ₹4,667/mo
              - generic [ref=f60e129]:
                - generic [ref=f60e130]: Total Discount
                - generic [ref=f60e131]: "-₹4,000"
            - separator [ref=f60e132]
            - generic [ref=f60e133]:
              - generic [ref=f60e134]:
                - paragraph [ref=f60e135]: Order details
                - generic [ref=f60e136]:
                  - paragraph [ref=f60e137]: MRP
                  - paragraph [ref=f60e138]: ₹50,000
                - generic [ref=f60e139]:
                  - paragraph [ref=f60e140]: Subtotal
                  - paragraph [ref=f60e141]: ₹31,998
              - generic [ref=f60e142]:
                - paragraph [ref=f60e143]: Shipping worth ₹240
                - paragraph [ref=f60e144]: ₹0FREE
              - generic [ref=f60e145]:
                - paragraph [ref=f60e146]: Installation worth ₹530
                - paragraph [ref=f60e147]: ₹0FREE
              - generic [ref=f60e148]:
                - paragraph [ref=f60e149]: Exchange applied
                - paragraph [ref=f60e150]: "-₹4,000"
          - button "Continue to checkout" [ref=f60e151] [cursor=pointer]
    - contentinfo [ref=f60e152]:
      - generic [ref=f60e153]:
        - generic [ref=f60e154]:
          - generic [ref=f60e155]:
            - generic [ref=f60e156] [cursor=pointer]:
              - button [ref=f60e157]:
                - link "Water Purifiers" [ref=f60e158]:
                  - /url: /c/water-purifiers
              - generic [ref=f60e160]:
                - link "RO Water Purifiers" [ref=f60e161]:
                  - /url: /c/water-purifiers/ro-water-purifier
                - link "UV Water Purifiers" [ref=f60e162]:
                  - /url: /c/water-purifiers/uv-water-purifier
                - link "Active Copper" [ref=f60e163]:
                  - /url: /c/water-purifiers/copper-water-purifier
                - link "Alkaline Boost" [ref=f60e164]:
                  - /url: /c/water-purifiers/alkaline-boost-water-purifier
                - link "Hot & Ambient" [ref=f60e165]:
                  - /url: /c/water-purifiers/hot-and-ambient-purifier
                - link "Stainless Steel Purifier" [ref=f60e166]:
                  - /url: /c/water-purifiers/stainless-steel-purifier
                - link "Slim Water Purifier" [ref=f60e167]:
                  - /url: /c/water-purifiers/slim-water-purifier
                - link "Under Counter Purifier" [ref=f60e168]:
                  - /url: /c/water-purifiers/under-counter-purifier
                - link "Spares & Accessories" [ref=f60e169]:
                  - /url: /c/water-purifiers/water-purifier-accessories-and-spares
                - link "Genuine Filters" [ref=f60e170]:
                  - /url: /c/water-purifiers/genuine-filters
            - generic [ref=f60e171] [cursor=pointer]:
              - button [ref=f60e172]:
                - link "Vacuum cleaners" [ref=f60e173]:
                  - /url: /c/vacuum-cleaners
              - generic [ref=f60e175]:
                - link "Robotic" [ref=f60e176]:
                  - /url: /c/vacuum-cleaners/robotic-vacuum-cleaner
                - link "Upright" [ref=f60e177]:
                  - /url: /c/vacuum-cleaners/upright-vacuum-cleaner
                - link "Canister" [ref=f60e178]:
                  - /url: /c/vacuum-cleaners/canister-vacumm-cleaner
                - link "Wet & Dry" [ref=f60e179]:
                  - /url: /c/vacuum-cleaners/wet-and-dry-vacuum-cleaner
                - link "Handheld" [ref=f60e180]:
                  - /url: /c/vacuum-cleaners/handheld-vacuum-cleaner
                - link "Pet Grooming" [ref=f60e181]:
                  - /url: /c/vacuum-cleaners/pet-grooming-vacuum-cleaner
                - link "Accessories" [ref=f60e182]:
                  - /url: /c/vacuum-cleaners/vacuum-cleaners-accessories
          - generic [ref=f60e183]:
            - generic [ref=f60e184] [cursor=pointer]:
              - button [ref=f60e185]:
                - link "Water solutions" [ref=f60e186]:
                  - /url: /c/water-solutions
              - generic [ref=f60e188]:
                - link "Water Softeners" [ref=f60e189]:
                  - /url: /c/water-solutions/aquaguard-water-softeners
                - link "Sediment Filter" [ref=f60e190]:
                  - /url: /c/water-solutions/sediment-filter
                - link "Activated Carbon Filter" [ref=f60e191]:
                  - /url: /c/water-solutions/activated-carbon-filter
                - link "Iron Remover" [ref=f60e192]:
                  - /url: /c/water-solutions/iron-remover
                - link "Water Solutions Accessories" [ref=f60e193]:
                  - /url: /c/water-solutions/water-solutions-accessories
            - generic [ref=f60e194] [cursor=pointer]:
              - button [ref=f60e195]:
                - link "Commercial Water Purifiers" [ref=f60e196]:
                  - /url: /c/commercial-water-purifiers
              - generic [ref=f60e198]:
                - link "UV Commercial Water Purifier" [ref=f60e199]:
                  - /url: https://www.eurekaforbes.com/c/commercial-water-purifiers/commercial-uv-water-purifiers
                - link "RO Commercial Water Purifier" [ref=f60e200]:
                  - /url: https://www.eurekaforbes.com/c/commercial-water-purifiers/commercial-ro-water-purifier
                - link "Water Cooler with Inbuilt Purifier and Storage" [ref=f60e201]:
                  - /url: /c/commercial-water-purifiers/storage-water-cooler-with-inbuilt-purifier
                - link "RO Plants" [ref=f60e202]:
                  - /url: /c/commercial-water-purifiers/skid-mounted-ro-plants
            - generic [ref=f60e203] [cursor=pointer]:
              - button [ref=f60e204]:
                - link "Air Purifiers" [ref=f60e205]:
                  - /url: /c/air-purifiers
              - generic [ref=f60e207]:
                - link "All Air Purifiers" [ref=f60e208]:
                  - /url: /c/air-purifiers/all-air-purifiers
                - link "Filters" [ref=f60e209]:
                  - /url: /c/air-purifiers/air-purifier-filters
          - generic [ref=f60e210]:
            - generic [ref=f60e211] [cursor=pointer]:
              - button [ref=f60e212]:
                - link "Servicing" [ref=f60e213]:
                  - /url: /ecom/cart#
              - generic [ref=f60e215]:
                - link "Buy AMC" [ref=f60e216]:
                  - /url: /amc/my-devices
                - link "Raise A Complaint" [ref=f60e217]:
                  - /url: /service
                - link "AMC Terms & Conditions" [ref=f60e218]:
                  - /url: https://www.eurekaforbes.com/amc-new-terms-and-condition
            - generic [ref=f60e219] [cursor=pointer]:
              - button [ref=f60e220]:
                - link "Account" [ref=f60e221]:
                  - /url: /account
              - generic [ref=f60e223]:
                - link "Profile" [ref=f60e224]:
                  - /url: /account/profile
                - link "Your Devices" [ref=f60e225]:
                  - /url: /amc/my-devices
                - link "Your Orders" [ref=f60e226]:
                  - /url: /ecom/orders
            - generic [ref=f60e227] [cursor=pointer]:
              - button [ref=f60e228]:
                - link "Corporate Gifting" [ref=f60e229]:
                  - /url: https://www.eurekaforbes.com/corporate-gifts-and-bulk-discounts?srsltid=AfmBOoqkJujXnL70NT1d-J_OTkzRBbW2qo_qThqFguttt0VSYWUSK6Ji
              - link "Corporate Gifting & Bulk Orders" [ref=f60e232]:
                - /url: https://www.eurekaforbes.com/corporate-gifts-and-bulk-discounts?srsltid=AfmBOoqkJujXnL70NT1d-J_OTkzRBbW2qo_qThqFguttt0VSYWUSK6Ji
          - generic [ref=f60e234] [cursor=pointer]:
            - button [ref=f60e235]:
              - link "About Eureka Forbes" [ref=f60e236]:
                - /url: /ecom/cart#
            - generic [ref=f60e238]:
              - link "About Us" [ref=f60e239]:
                - /url: /about-us
              - link "Connect With Us" [ref=f60e240]:
                - /url: /connect-with-us
              - link "Investor Relations" [ref=f60e241]:
                - /url: /investor-relations
              - link "Sustainability" [ref=f60e242]:
                - /url: /sustainability
              - link "Press Release" [ref=f60e243]:
                - /url: /press-release
              - link "Authorized Service Center" [ref=f60e244]:
                - /url: /authorized-center
              - link "Office Near You" [ref=f60e245]:
                - /url: /storelocator
              - link "Blog" [ref=f60e246]:
                - /url: /blog
              - link "Book a Demo" [ref=f60e247]:
                - /url: /contactus/index/bookademorequest
              - link "Returns & Refunds Policy" [ref=f60e248]:
                - /url: /return-and-replacement-policy?srsltid=AfmBOoomc9u2-7ELXVpT9chv2zw9Op6AaxXoFZJWIfO_8OXTeIEtyc5k
              - link "Sell with EarnSmart Program" [ref=f60e249]:
                - /url: /sell-with-earnsmart
              - link "Careers" [ref=f60e250]:
                - /url: https://www.eurekaforbes.com/careers
        - generic [ref=f60e251]:
          - generic [ref=f60e252]:
            - paragraph [ref=f60e253]: Registered Office and Corporate Office
            - paragraph [ref=f60e254]: B1/B2, 701, 7th Floor, Marathon Innova, Off. Ganpatrao Kadam Marg, Lower Parel (West), Mumbai, Maharashtra – 400013
          - generic [ref=f60e255]:
            - paragraph [ref=f60e256]: Manufacturer/Importer details
            - paragraph [ref=f60e257]: Eureka Forbes Limited
          - generic [ref=f60e258]:
            - paragraph [ref=f60e259]: Corporate Identity Number (CIN)
            - paragraph [ref=f60e260]: L27310MH2008PLC188478
        - separator [ref=f60e261]
        - generic [ref=f60e262]:
          - paragraph [ref=f60e263]: More ways to shop
          - link "Call 7039883333" [ref=f60e265] [cursor=pointer]:
            - /url: tel:7039883333
        - generic [ref=f60e266]:
          - link [ref=f60e267] [cursor=pointer]:
            - /url: https://in.linkedin.com/company/eureka-forbes-ltd
            - img "LinkedIn" [ref=f60e268]
          - link [ref=f60e269] [cursor=pointer]:
            - /url: https://www.facebook.com/EurekaForbes/
            - img "Facebook" [ref=f60e270]
          - link [ref=f60e271] [cursor=pointer]:
            - /url: https://x.com/EurekaforbesIN
            - img "Twitter" [ref=f60e272]
          - link [ref=f60e273] [cursor=pointer]:
            - /url: https://www.youtube.com/c/eurekaforbes
            - img "YouTube" [ref=f60e274]
          - link [ref=f60e275] [cursor=pointer]:
            - /url: https://www.instagram.com/eurekaforbesofficial/
            - img "Instagram" [ref=f60e276]
        - generic [ref=f60e277]:
          - paragraph [ref=f60e278]: India
          - generic [ref=f60e279]:
            - paragraph [ref=f60e280]: © 2026 Eureka Forbes. All Rights Reserved.
            - generic [ref=f60e281]:
              - link "Privacy" [ref=f60e282] [cursor=pointer]:
                - /url: /en/privacy-policy
              - link "Terms of use" [ref=f60e283] [cursor=pointer]:
                - /url: /terms-of-use
              - link "Legal" [ref=f60e284] [cursor=pointer]:
                - /url: /legal
              - link "Sitemap" [ref=f60e285] [cursor=pointer]:
                - /url: /sitemap.xml
        - paragraph [ref=f60e286]: "Disclaimer: The displayed product colours and shades are indicative and cannot be considered to be a precise representation of the actual colours."
  - alert [ref=f60e287]
  - iframe [ref=f60e288]:
    - generic [ref=f66e12]:
      - 'link "4-Hour Delivery & Installation* now live for Delhi NCR Region | Order before 3PM | *T&C Apply | Note: Delivery might be delayed to High Demand" [ref=f66e13] [cursor=pointer]':
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
  95  |   /*
  96  |     //console.log('Step 10: Verify exchange discount applied');
  97  |     //expect(await cartPage.isExchangeDiscountVisible()).toBe(true);
  98  |   */
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
  121 |   */
  122 |      
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
  149 |     
  150 |   });
  151 | });
  152 | 
```