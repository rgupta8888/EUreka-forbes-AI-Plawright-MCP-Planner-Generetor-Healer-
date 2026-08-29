# Eureka Forbes Water Purifier Purchase Flow Test Plan

## Application Overview

This test plan covers the end-to-end user journey for the Eureka Forbes Water Purifier e-commerce flow, including product discovery, product details, adding to cart, quantity management, exchange offer application and removal, coupon application, and cart management. The focus is on the Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier with specific pricing and exchange offer validations.

## Test Scenarios

### 1. Landing Page and Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Navigate to Water Purifiers category from homepage

**File:** `tests/landing-page/navigate-to-category.spec.ts`

**Steps:**
  1. Launch the Eureka Forbes website at https://www.eurekaforbes.com/
    - expect: Homepage loads successfully with navigation menu visible
    - expect: Water Purifiers category link is visible in the main navigation
  2. Click on 'Water Purifiers' link in the main navigation menu
    - expect: Water Purifiers category page loads successfully
    - expect: Page title shows 'Buy Best Water Purifiers and Filters for Home in India | Eureka Forbes'
    - expect: Product listing is displayed with multiple water purifier options
  3. Verify that trending products are displayed including Aquaguard Enrich Nexen
    - expect: Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier is visible in the product list
    - expect: Product displays correct price: ₹15,999 (MRP ₹25,000)
    - expect: Product displays tags: RO+UV, Active Copper + Alkaline Boost, 2X Filter Life, 12 Stage Purification

#### 1.2. Verify product tags and filtering capability

**File:** `tests/landing-page/verify-product-tags.spec.ts`

**Steps:**
  1. Navigate to Water Purifiers category page
    - expect: Category page loads with product listings
  2. Identify the Aquaguard Enrich Nexen product in the trending section
    - expect: Product card displays all four required tags: RO+UV
    - expect: Active Copper + Alkaline Boost, 2X Filter Life, 12 Stage Purification
  3. Verify that the product is displayed with correct pricing and exchange offer badge
    - expect: Price displayed: ₹15,999
    - expect: MRP shown: ₹25,000 (36% OFF)
    - expect: Exchange offer badge 'Rs.4000 Exchange Offer' is visible

#### 1.3. Navigate to product detail page from listing

**File:** `tests/landing-page/navigate-to-pdp.spec.ts`

**Steps:**
  1. From the Water Purifiers category page, click on the Aquaguard Enrich Nexen product card
    - expect: Product Details Page (PDP) loads successfully
    - expect: Page URL contains product SKU: GWPDNROCA0002X
    - expect: Product title is displayed correctly
  2. Verify page has loaded completely
    - expect: All product images are loaded
    - expect: Product description section is visible
    - expect: Price and add to cart button are displayed

### 2. Product Details Page (PDP) Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify PDP displays correct product information

**File:** `tests/pdp/verify-product-info.spec.ts`

**Steps:**
  1. Navigate to the Aquaguard Enrich Nexen PDP at /dp/GWPDNROCA0002X
    - expect: Page title displays product name: 'Aquaguard Enrich Nexen'
    - expect: Product price is displayed as ₹15,999
    - expect: MRP shown as ₹25,000 with 36% OFF discount
  2. Verify product name and description
    - expect: Full product name is displayed: 'Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier | 2 Year Filter Life | With Mega Sediment Filter'
    - expect: Product features are listed including all purification stages

#### 2.2. Verify Delivery & Installation section with PIN code

**File:** `tests/pdp/verify-delivery-installation.spec.ts`

**Steps:**
  1. Scroll to 'Delivery & Installation' section on PDP
    - expect: 'Delivery & Installation' section header is visible
    - expect: PIN code input textbox is present and editable
    - expect: 'Check' button is displayed next to the PIN code field
  2. Verify stock status message
    - expect: Stock status displays: 'In stock - Free shipping & installation'
  3. Test entering a valid PIN code (122003) in the textbox
    - expect: PIN code is accepted in the input field
    - expect: Text is visible in the textbox

#### 2.3. Verify exchange offer section on PDP

**File:** `tests/pdp/verify-exchange-offer.spec.ts`

**Steps:**
  1. Scroll to 'Ways to buy' section on PDP
    - expect: 'Ways to buy' heading is visible
    - expect: Exchange offer section is displayed with label 'WEB EXCLUSIVE'
  2. Verify exchange offer content
    - expect: Message displayed: 'Exchange ANY old appliance for discounts on a new device!'
    - expect: 'Select' button is present and clickable
    - expect: Message 'Get upto ₹4000 OFF' is displayed
    - expect: 'Learn more' button is visible
  3. Verify additional bank offers and EMI information
    - expect: Bank offers section shows '10% instant discount on all credit/debit cards'
    - expect: EMI plans are displayed with text 'No-cost EMI plans, up to ₹2,667 off'
    - expect: 'Big Exchange' offer is displayed with discount details

#### 2.4. Verify Add to Cart button and functionality on PDP

**File:** `tests/pdp/verify-add-to-cart.spec.ts`

**Steps:**
  1. Identify the 'Add to cart' button on the PDP
    - expect: 'Add to cart' button is visible and clickable
    - expect: Button is enabled and interactive
  2. Click the 'Add to cart' button
    - expect: Page redirects to /ecom/cart
    - expect: Product is successfully added to cart
    - expect: Cart shows 1 item with the product

### 3. Cart Page - Initial State Validation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify cart displays product with correct information

**File:** `tests/cart/verify-initial-cart-state.spec.ts`

**Steps:**
  1. After adding product to cart, verify the cart page loads
    - expect: Page title shows 'Eureka forbes'
    - expect: Page URL is /ecom/cart
    - expect: 'Review your cart' heading is displayed
  2. Verify product line item displays correct name and link
    - expect: Product name is displayed: 'Aquaguard Enrich Nexen 2X RO+UV Active Copper Alkaline Water Purifier | 2 Year Filter Life | With Mega Sediment Filter'
    - expect: Product name is clickable and links to the PDP
  3. Verify product pricing in cart
    - expect: MRP displayed: ₹25,000
    - expect: Current price displayed: ₹15,999
    - expect: Pricing is correct and matches PDP

#### 3.2. Verify quantity and delete controls

**File:** `tests/cart/verify-quantity-delete.spec.ts`

**Steps:**
  1. Verify quantity field in the cart line item
    - expect: Quantity field shows default value: '1'
    - expect: Quantity increment button is present and enabled
    - expect: Quantity decrement button is present but disabled for quantity 1
  2. Verify delete option for product
    - expect: Delete button/icon is visible for the product line item
    - expect: Delete button is clickable and interactive

#### 3.3. Verify exchange offer section in cart

**File:** `tests/cart/verify-exchange-in-cart.spec.ts`

**Steps:**
  1. Scroll to 'Exchange your old appliance' section in cart
    - expect: Section header 'Exchange your old appliance' is visible
    - expect: 'Get upto ₹4000 off' message is displayed
    - expect: 'Select' button is present and clickable
    - expect: 'Learn more' button is visible
  2. Verify section is initially in not-selected state
    - expect: Exchange offer is not yet applied
    - expect: Section shows as selectable but not active

#### 3.4. Verify coupons and benefits section

**File:** `tests/cart/verify-coupons.spec.ts`

**Steps:**
  1. Scroll to 'Coupons and benefits' section
    - expect: Section header 'Coupons and benefits' is visible
    - expect: 'Apply Coupon' button is present and clickable
  2. Verify bank offers display in cart
    - expect: Bank offers section shows '10% instant discount on all credit/debit cards'
    - expect: EMI offers are displayed

#### 3.5. Verify order details and total calculation

**File:** `tests/cart/verify-order-details.spec.ts`

**Steps:**
  1. Scroll to 'Order details' section
    - expect: Order details section header is visible
  2. Verify MRP line item
    - expect: MRP label is displayed
    - expect: MRP value shows ₹25,000
  3. Verify Subtotal calculation
    - expect: Subtotal label is displayed
    - expect: Subtotal value shows ₹15,999 (matching quantity 1 × ₹15,999)
  4. Verify Shipping cost
    - expect: Shipping line shows 'Shipping worth ₹240'
    - expect: Shipping discount shows '₹0 FREE'
  5. Verify Installation cost
    - expect: Installation line shows 'Installation worth ₹530'
    - expect: Installation discount shows '₹0 FREE'
  6. Verify total calculation
    - expect: Total label is displayed as 'Total'
    - expect: Total value shows ₹15,999
  7. Verify GST and EMI info
    - expect: 'Includes GST*' text is displayed
    - expect: 'No-cost EMI from ₹2,667/mo' is shown

### 4. Cart Page - Quantity Update

**Seed:** `tests/seed.spec.ts`

#### 4.1. Update product quantity from 1 to 2

**File:** `tests/cart/update-quantity.spec.ts`

**Steps:**
  1. In the cart, locate the quantity field showing '1'
    - expect: Quantity field is visible and shows value '1'
  2. Click the quantity increment button to increase to 2
    - expect: Quantity field updates to show '2'
    - expect: Increment button is clickable and responsive
  3. Verify order totals update after quantity change
    - expect: Subtotal updates to reflect quantity 2
    - expect: Subtotal now shows ₹31,998 (2 × ₹15,999)
    - expect: Total updates accordingly to ₹31,998
  4. Verify MRP and free services remain the same
    - expect: MRP still shows ₹25,000
    - expect: Shipping and Installation remain ₹0 FREE

#### 4.2. Verify quantity cannot go below 1

**File:** `tests/cart/verify-quantity-limits.spec.ts`

**Steps:**
  1. With quantity at 1, attempt to click decrement button
    - expect: Decrement button is disabled when quantity is 1
    - expect: Quantity remains at 1
  2. Update quantity to 2 and then to 3
    - expect: Increment button works correctly
    - expect: Quantity updates to 3
  3. Click decrement button to go back to 1
    - expect: Decrement button is now active when quantity > 1
    - expect: Quantity decreases to 2, then 1

### 5. Cart Page - Exchange Offer Application

**Seed:** `tests/seed.spec.ts`

#### 5.1. Apply exchange offer with category selection

**File:** `tests/cart/apply-exchange-offer.spec.ts`

**Steps:**
  1. In the cart with quantity 2, click 'Select' button in 'Exchange your old appliance' section
    - expect: Exchange offer modal/dialog opens
    - expect: User is prompted to select an appliance category
  2. Select 'Water Purifiers' category from the available options
    - expect: 'Water Purifiers' category is selectable
    - expect: Category selection is confirmed
  3. Click 'Continue with exchange' button after category selection
    - expect: Flow progresses to next step
    - expect: User is presented with PIN code entry screen
  4. Enter PIN code '122003' in the provided textbox
    - expect: PIN code is entered correctly in the field
    - expect: PIN code is visible in the textbox
  5. Click 'Check' button to validate the PIN
    - expect: PIN validation is processed
    - expect: Success message or validation status is displayed
    - expect: If successful, option to apply discount appears
  6. Click 'Apply' button to apply the exchange discount
    - expect: Discount is applied to the cart
    - expect: Confirmation message displays: 'Exchange applied! You saved ₹4000 on this order'
  7. Verify option to add exchange to cart
    - expect: 'Add to cart' or confirmation option appears for the exchange
    - expect: System shows exchange has been applied

#### 5.2. Verify exchange discount in order details

**File:** `tests/cart/verify-exchange-discount.spec.ts`

**Steps:**
  1. After applying exchange offer, scroll to 'Order details' section
    - expect: Order details section is updated
    - expect: New exchange discount line item appears in the breakdown
  2. Verify exchange discount amount
    - expect: Exchange discount shows ₹4000 deduction
    - expect: Discount is clearly labeled
  3. Verify total is updated with exchange discount
    - expect: New subtotal reflects the exchange: ₹31,998 - ₹4000 = ₹27,998
    - expect: Total displayed is ₹27,998 (for quantity 2 with exchange)

#### 5.3. Verify exchange confirmation and messaging

**File:** `tests/cart/verify-exchange-confirmation.spec.ts`

**Steps:**
  1. After exchange is applied, verify confirmation message
    - expect: Message 'Exchange applied! You saved ₹4000 on this order' is displayed
    - expect: Message is clearly visible to the user
  2. Verify exchange section updates to show applied state
    - expect: Exchange offer section shows exchange is now active/applied
    - expect: Section indicates the discount amount
  3. Verify user can still manage the exchange
    - expect: Option to remove/edit exchange is available

### 6. Cart Page - Exchange Offer Removal

**Seed:** `tests/seed.spec.ts`

#### 6.1. Remove applied exchange offer

**File:** `tests/cart/remove-exchange-offer.spec.ts`

**Steps:**
  1. With exchange offer applied, locate the exchange offer section in the cart
    - expect: Exchange section shows the applied state with ₹4000 discount
  2. Click delete/remove button for the exchange offer
    - expect: Remove/delete action is initiated
    - expect: Exchange discount is removed from the cart
  3. Verify order totals revert to pre-exchange amounts
    - expect: Exchange discount line is removed from order details
    - expect: Subtotal reverts to ₹31,998 (quantity 2 without exchange)
    - expect: Total displays ₹31,998 (no longer reduced by ₹4000)
  4. Verify exchange section resets to non-applied state
    - expect: Exchange offer section shows 'Select' option again
    - expect: No active discount is displayed

#### 6.2. Verify exchange can be re-applied after removal

**File:** `tests/cart/re-apply-exchange.spec.ts`

**Steps:**
  1. After removing exchange, verify cart shows total ₹31,998
    - expect: Total correctly reflects quantity 2 without exchange
  2. Click 'Select' button in exchange section again
    - expect: Exchange flow can be initiated again
    - expect: Modal opens for category selection
  3. Re-apply exchange with same PIN code and category
    - expect: Exchange can be re-applied successfully
    - expect: Discount of ₹4000 is applied again
    - expect: Total updates to ₹27,998

### 7. Cart Page - Product Deletion

**Seed:** `tests/seed.spec.ts`

#### 7.1. Delete product from cart

**File:** `tests/cart/delete-product.spec.ts`

**Steps:**
  1. With product in cart (quantity 2, exchange applied or not), locate the delete button for the product
    - expect: Delete button/icon is visible on the product line item
    - expect: Delete button is clickable
  2. Click the delete button for the product
    - expect: Product line item is removed from the cart
    - expect: Delete action is confirmed
  3. Verify cart displays empty state
    - expect: Cart shows empty cart message or state
    - expect: 'Review your cart' section is empty
    - expect: No product line items are displayed
  4. Verify order details section updates
    - expect: Order details section may disappear or show zero amounts
    - expect: No pricing is displayed when cart is empty
  5. Verify user can return to shopping
    - expect: Navigation options are available to browse products again
    - expect: User can click 'Continue shopping' or similar option to return to product listing

#### 7.2. Delete product when exchange is applied

**File:** `tests/cart/delete-product-with-exchange.spec.ts`

**Steps:**
  1. Add product to cart with quantity 2 and exchange offer applied (₹4000 discount)
    - expect: Product shows quantity 2 with total ₹27,998
  2. Click delete button for the product
    - expect: Delete action removes the entire product line item
    - expect: Exchange offer associated with product is also removed
  3. Verify cart becomes empty
    - expect: Cart displays empty state
    - expect: No product line items remain
    - expect: Exchange offer is not shown separately

<!-->
### Will be automated later  , Dont automate 
### 8. Edge Cases and Error Handling


**Seed:** `tests/seed.spec.ts`

#### 8.1. Invalid PIN code validation

**File:** `tests/cart/invalid-pin-code.spec.ts`

**Steps:**
  1. Click 'Select' in exchange section and proceed to PIN entry
    - expect: PIN entry screen is displayed
  2. Enter an invalid PIN code (e.g., '000000') in the textbox
    - expect: Invalid PIN is entered without immediate blocking
  3. Click 'Check' button
    - expect: System validates the PIN
    - expect: Error message displays indicating PIN is not serviceable or invalid
    - expect: 'Apply' button is not enabled or is disabled
  4. Verify user can correct and retry with valid PIN (122003)
    - expect: User can clear the field and enter correct PIN
    - expect: Valid PIN can be successfully checked

#### 8.2. Test with maximum and minimum quantities

**File:** `tests/cart/quantity-edge-cases.spec.ts`

**Steps:**
  1. Add product to cart and set quantity to 1 (minimum)
    - expect: Quantity shows 1
    - expect: Decrement button is disabled
  2. Calculate and verify total for quantity 1
    - expect: Total is ₹15,999
  3. Increment quantity to a high number (e.g., 10)
    - expect: Quantity increments successfully
    - expect: No error or blocking occurs
  4. Verify total calculation for high quantity
    - expect: Total is ₹159,990 (10 × ₹15,999)
    - expect: Calculation is correct

#### 8.3. Verify empty cart checkout prevention

**File:** `tests/cart/empty-cart-checkout.spec.ts`

**Steps:**
  1. Delete all products from cart to make it empty
    - expect: Cart becomes empty
  2. Look for checkout button
    - expect: 'Continue to checkout' button may be disabled or not visible
    - expect: User cannot proceed with empty cart
  3. Navigate back to products and add item to cart
    - expect: Product can be added again after removing all items

#### 8.4. Test PIN code with special characters and spaces

**File:** `tests/cart/pin-special-characters.spec.ts`

**Steps:**
  1. Proceed to exchange PIN entry screen
    - expect: PIN textbox is focused and ready for input
  2. Try entering PIN with spaces (e.g., '122 003')
    - expect: System handles spacing appropriately
    - expect: Either accepts or strips spaces, resulting in valid PIN check
  3. Try entering non-numeric characters
    - expect: Textbox may restrict input to numbers only
    - expect: Or displays error on check attempt

#### 8.5. Verify coupon application flow

**File:** `tests/cart/coupon-application.spec.ts`

**Steps:**
  1. Click 'Apply Coupon' button in cart
    - expect: Coupon entry dialog or form appears
    - expect: User is prompted to enter coupon code
  2. Verify coupon section elements
    - expect: Coupon input field is visible
    - expect: Apply button for coupon is present
  3. Attempt to apply a test coupon code if available
    - expect: System processes coupon input
    - expect: Confirmation or error message is displayed

#### 8.6. Test navigation preservation during exchange flow

**File:** `tests/cart/navigation-preservation.spec.ts`

**Steps:**
  1. Start exchange offer application from cart
    - expect: Modal/dialog for exchange opens
  2. Close the modal using back button or close icon
    - expect: Exchange dialog closes
    - expect: User remains on cart page
    - expect: Cart contents are preserved
  3. Verify cart state is unchanged
    - expect: Product, quantity, and pricing remain the same
    - expect: No accidental additions or deletions occurred

### 9. Integration and Happy Path Scenarios

**Seed:** `tests/seed.spec.ts`

#### 9.1. Complete purchase flow with exchange

**File:** `tests/integration/complete-flow-with-exchange.spec.ts`

**Steps:**
  1. Start at homepage and navigate to Water Purifiers
    - expect: Category page loads with products
  2. Click on Aquaguard Enrich Nexen product to open PDP
    - expect: PDP loads with all product details
  3. Verify all PDP sections (Delivery & Installation, Exchange offer, pricing)
    - expect: All sections are present and correct
  4. Click 'Add to cart' on PDP
    - expect: Product is added to cart
    - expect: Redirect to cart page occurs
  5. Update quantity to 2 on cart page
    - expect: Quantity updates to 2
    - expect: Total updates to ₹31,998
  6. Apply exchange offer with PIN 122003
    - expect: Exchange selection modal opens
    - expect: PIN entry works
    - expect: Exchange is applied successfully
    - expect: Confirmation message appears
  7. Verify final order details with quantity 2 and ₹4000 exchange discount
    - expect: Subtotal: ₹31,998
    - expect: Exchange discount: -₹4000
    - expect: Total: ₹27,998
  8. Verify user can proceed to checkout
    - expect: 'Continue to checkout' button is visible and enabled

#### 9.2. Complete purchase flow without exchange

**File:** `tests/integration/complete-flow-without-exchange.spec.ts`

**Steps:**
  1. Navigate to Water Purifiers category
    - expect: Category page displays products
  2. Select Aquaguard Enrich Nexen and click to open PDP
    - expect: PDP loads successfully
  3. Click 'Add to cart'
    - expect: Product added to cart
  4. In cart, keep quantity at 1 (default)
    - expect: Quantity remains 1
  5. Skip exchange offer selection
    - expect: Exchange offer section remains unselected
  6. Verify order totals without exchange
    - expect: MRP: ₹25,000
    - expect: Subtotal: ₹15,999
    - expect: Shipping & Installation: Free
    - expect: Total: ₹15,999
  7. Proceed to checkout
    - expect: Checkout button is clickable

#### 9.3. Purchase flow with quantity update and exchange

**File:** `tests/integration/quantity-exchange-flow.spec.ts`

**Steps:**
  1. Add product to cart
    - expect: Initial quantity is 1, total is ₹15,999
  2. Increase quantity to 3
    - expect: Quantity updates to 3
    - expect: Total becomes ₹47,997 (3 × ₹15,999)
  3. Apply exchange offer
    - expect: Exchange modal opens and shows category selection
  4. Select Water Purifiers and validate with PIN 122003
    - expect: PIN validation succeeds
  5. Apply exchange discount
    - expect: Discount of ₹4000 is applied
    - expect: Final total becomes ₹43,997 (₹47,997 - ₹4000)
  6. Verify complete order summary
    - expect: Quantity: 3
    - expect: Subtotal: ₹47,997
    - expect: Exchange discount: -₹4000
    - expect: Final Total: ₹43,997

#### 9.4. Cross-browser cart persistence

**File:** `tests/integration/cart-persistence.spec.ts`

**Steps:**
  1. Add product to cart on the website
    - expect: Cart displays 1 item
  2. Navigate to different categories (e.g., Vacuum Cleaners, Air Purifiers)
    - expect: Cart count remains visible in header
    - expect:  Cart still shows 1 item
  3. Navigate back to Water Purifiers category
    - expect: Product is still in cart
  4. Return to cart page
    - expect: Previously added product is still there
    - expect: Quantity and pricing are preserved

#### 9.5. Multiple product addition and cart management

**File:** `tests/integration/multiple-products-cart.spec.ts`

**Steps:**
  1. Add Aquaguard Enrich Nexen to cart
    - expect: Product 1 added
  2. Navigate back to products and add a different water purifier to cart
    - expect: Second product is added to cart
    - expect: Both items appear in cart
  3. Verify cart displays multiple line items
    - expect: Each product has its own line item
    - expect: Quantity controls work independently for each product
    - expect: Separate delete buttons for each item
  4. Update quantities and verify totals
    - expect: Each product's subtotal calculates correctly
    - expect: Grand total sums all line items accurately

#### 9.6. Price accuracy across different paths

**File:** `tests/integration/price-accuracy.spec.ts`

**Steps:**
  1. View Aquaguard Enrich Nexen on category listing page
    - expect: Price shown: ₹15,999 MRP ₹25,000
  2. Click product to open PDP
    - expect: PDP shows same price: ₹15,999 MRP ₹25,000
  3. Add to cart and view in cart
    - expect: Cart displays same price: ₹15,999 MRP ₹25,000
  4. With quantity 2, verify subtotal
    - expect: Subtotal: ₹31,998 (2 × ₹15,999)
  5. With exchange applied
    - expect: Exchange discount: ₹4000
    - expect: Final total: ₹27,998 (₹31,998 - ₹4000)
