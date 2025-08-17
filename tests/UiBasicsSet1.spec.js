const { test, expect } = require("@playwright/test");

// these 2 tests will run in sequence, first one with browser fixture and second one without browser fixture

test("First Playwright Test with browser fixture", async ({ browser }) => {
  const context = await browser.newContext(); // Create a new browser context with default settings
  const page = await context.newPage(); // Create a new page in the context
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});

test("First Playwright Test without browser fixture", async ({ page }) => {
  // don't require browser fixture, Playwright will use the default browser context
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("Successful Login Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator("#terms").check();
  await page.locator("#signInBtn").click();
  await expect(page.locator("app-shop")).toBeVisible(); // wait and check if this locator is visible in the DOM
  await expect(page.locator("app-shop a.navbar-brand")).toHaveText(
    "ProtoCommerce Home"
  ); // wait and check if this locator has text "Shop"
});

test("Failed Login Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("wrongpassword");
  await page.locator("#signInBtn").click();

  // playwright will wait for the error message with below locator to appear in the DOM (default timeout is configured 40 seconds)
  const errorMessage = await page
    .locator("div[style*='display: block;']")
    .textContent(); // Get the error message text
  expect(errorMessage).toContain("Incorrect username/password."); // Check if the error message contains "Incorrect"
});

test("Clear the text fields", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("invalidUser");
  const userNameValue = await page.locator("#username").inputValue();

  console.log(`Username before clearing: ${userNameValue}`);

  // clear the userName field before filling it
  await page.locator("#username").clear();
  //   await page.locator("#username").fill(""); // fill it with empty string this is also same as clear

  const clearedUserNameValue = await page.locator("#username").inputValue();
  console.log(`Username after clearing: ${clearedUserNameValue}`);

  // verify blank username field
  expect(await page.locator("#username").inputValue()).toBe("");
});

test("Working with multiple elements  -- verify the text by first , last , or nth", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator("#terms").check();
  await page.locator("#signInBtn").click();

  // div.card-body a  has multiple elements, we will get the first element in the list
  await expect(page.locator("div.card-body a").first()).toHaveText("iphone X");

  // or we can also use nth(1) to get the second element in the list
  await expect(page.locator("div.card-body a").nth(1)).toHaveText(
    "Samsung Note 8"
  );

  // or we can also use last() to get the last element in the list
  await expect(page.locator("div.card-body a").last()).toHaveText("Blackberry");
});

test("Working with multiple elements  -- get the text of each elements", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");
  await page.locator("#terms").check();
  await page.locator("#signInBtn").click();
  await page.locator("div.card-body a").first().textContent();
  const productNames = await page.locator("div.card-body a").allTextContents();
  console.log("Product Names: ", productNames); // Product Names:  [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
});
