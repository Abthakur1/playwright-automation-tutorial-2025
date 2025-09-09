const { test, expect } = require("@playwright/test");

test("Network Intercept Call - Validate empty order message by mocking the network response", async ({
  page,
}) => {
  const fakeResponseForNoOrder = { data: [], message: "No Orders" };

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("absk.cts@gmail.com");
  await page.locator("#userPassword").fill("Automation@2025");
  await page.locator("#login").click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63a4160203841e9c9a5c8de9",
    async (route) => {
      let body = fakeResponseForNoOrder;
      const response = await page.request.fetch(route.request());
      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.pause();
  // Go to ORDERS
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  // await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
  // await page
  //   .locator("div[class*='container table-responsive']")
  //   .locator("div")
  //   .first().waitFor();

  // await page.waitForLoadState('networkidle');

  const noOrdersText = await page
    .locator("div[class*='container table-responsive']")
    .locator("div")
    .first()
    .textContent();
  console.log(noOrdersText);

  expect(noOrdersText).toContain(
    "You have No Orders to show at this time. Please Visit Back Us"
  );
});

test('Intercept product list API on demoblaze.com', async ({ page }) => {
  // Intercept the product list API
  await page.route('https://api.demoblaze.com/bycat', async (route, request) => {
    // Log the request payload
    const postData =  request.postData();
    console.log('Intercepted bycat request:', postData);
    // Continue the request unmodified
    await route.continue();
  });

  // Go to demoblaze.com
  await page.goto('https://www.demoblaze.com/');

  // Wait for products to load
  await page.waitForSelector('.card-title');

  // Assert that products are visible
  const productTitles = await page.$$eval('.card-title', els => els.map(e => e.textContent));
  expect(productTitles.length).toBeGreaterThan(0);
});
