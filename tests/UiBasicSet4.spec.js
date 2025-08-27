const { test, expect } = require("@playwright/test");

test("Verify Element hidden or visible", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.locator("#show-textbox").click();
  await expect(page.locator("#displayed-text")).toBeVisible();
});

test("Popup Handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator("#alertbtn").click();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
});

test("Frame Handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator('a[href="lifetime-access"]:visible').click();
  const lifetimeAccessTitle = await framesPage.locator("section[class='page-title']").locator("div[class='inner-box']").locator("h1").textContent();
  expect(lifetimeAccessTitle).toContain("All Access Subscription");
});
