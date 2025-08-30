const { test, expect } = require("@playwright/test");

test.only("UI Basics Practice 1 - Sauce demo app Get all the product list", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await page.locator('span[data-test="title"]:has-text("Products")').waitFor();
  await expect(
    page.locator('span[data-test="title"]:has-text("Products")')
  ).toBeVisible();
  const totalItems = await page.locator("div.inventory_item_name").count();
  for (let i = 0; i < totalItems; i++) {
    const itemName = await page
      .locator("div.inventory_item_name").nth(i)
      .textContent();
    console.log(itemName);
  }
});
