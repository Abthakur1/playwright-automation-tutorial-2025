const { test, expect, request } = require("@playwright/test");
const loginPayload = {
  userEmail: "absk.cts@gmail.com",
  userPassword: "Automation@2025",
}; // java script object

var token;

test.beforeAll(async () => {
  const apiContext = await request.newContext(); // to create a new API context
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy(); // to check if the response is successful
  const loginResponseJson = await loginResponse.json();
  console.log(loginResponseJson);
  token = loginResponseJson.token;
});

test.only("Web API Part 1 - without login in ui using the token from local storage", async ({
  page,
}) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token); // to set the token (which is set in beforeAll ,in local storage before the page is loaded
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("div.card-body b").first().waitFor(); // wait for the first element to be visible
  const allProducts = await page.locator("div.card-body b").allTextContents(); //[ 'ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO' ]
  console.log(allProducts);
  expect(allProducts).toContain("ADIDAS ORIGINAL");
});
