//1.Goto https://rahulshettyacademy.com/client
//2.sign in
//3.select the product IPHONE 13 PRO dynamically
//4.Click add to cart
//5.Go to cart and verify that the same item which you added is showing into the my cart.
//6.Checkout
//7.Verify that the same email id is shown on Shipping Information.
//8.select country in the dynamic dropdown
//9.Apply coupon "rahulshettyacademy"
//10.Verify the coupon applied successfully.
//11.Place order
// 12.Verify the message "Thankyou for the order."
// 13. capture order id.
// 14. Go to order history page.
// 15. Check where is that order presents with order id.
// 16. Once found go and view the order and verify

const { test, expect } = require("@playwright/test");

test("UI E2E Test - ecommerce", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("absk.cts@gmail.com");
  await page.locator("#userPassword").fill("Automation@2025");
  await page.locator("#login").click();

  const products = page.locator("div.card"); // Get all product cards in array
  const countOfProducts = await products.count();

  for (let i = 0; i < countOfProducts; i++) {
    const productTitle = await products.nth(i).locator("b").textContent(); // chain locators to get the product name
    console.log(productTitle);
    if (productTitle === "iphone 13 pro") {
      await products
        .nth(i)
        .locator("button")
        .locator("text= Add To Cart")
        .click(); // click the add to cart button
      break;
    }
  }

  await page.locator("button[routerlink='/dashboard/cart']").click(); // Go to cart
  await page.locator("h1:has-text('My Cart')").waitFor(); // Wait for cart page to load
  const itemOnMyCart = await page.locator("div.cartSection h3").textContent();
  expect(itemOnMyCart).toBe("iphone 13 pro"); // Verify the item in cart
  await page.getByText("Checkout").click(); // Click on checkout

  await page.locator(".payment__title").first().waitFor(); // Wait for payment page to load
  const emailId = await page.locator("div.details__user label").textContent();
  expect(emailId).toContain("absk.cts@gmail.com"); // Verify email id on shipping information

  // dynamic dropdown  -- country selection
  await page
    .locator('input[placeholder="Select Country"]')
    .pressSequentially("ind");
  const dropdownOptions = page.locator("section[class*='ta-results']");
  await dropdownOptions.waitFor();
  const totalOptions = await dropdownOptions.locator("button").count();
  for (let i = 0; i < totalOptions; i++) {
    const optionText = await dropdownOptions
      .locator("button")
      .nth(i)
      .textContent();
    if (optionText.trim() === "India") {
      await dropdownOptions.locator("button").nth(i).click();
      break;
    }
  }
  await page.getByText("Place Order ").click();
  const oderCompletion = await page
    .locator('h1[class="hero-primary"]')
    .textContent();
  expect(oderCompletion).toContain("Thankyou for the order.");

  const orderId = await page
    .locator("td[class='em-spacer-1'] label")
    .nth(1)
    .textContent();

  // get only number from orderId string
  const orderIdNumber = orderId.split(" ")[2];
  console.log(orderIdNumber);
  await page.locator('button[routerlink="/dashboard/myorders"]').click(); // Go to order history page
  await page.waitForLoadState("networkidle");
  const allOrders = page.locator('table[class*="table"] th[scope="row"]');
  const totalOrders = await allOrders.count();
  for (let i = 0; i < totalOrders; i++) {
    const orderNumber = await allOrders.nth(i).textContent();
    console.log(orderNumber);
    if (orderNumber === orderIdNumber) {
      expect(orderNumber).toBe(orderIdNumber);
      break;
    }
  }
});
