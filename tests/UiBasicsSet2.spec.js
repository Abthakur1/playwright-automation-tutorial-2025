const { test, expect } = require("@playwright/test");

test("Ui Basics Set 2 - get the text of all elements", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill("absk.cts@gmail.com");
    await page.locator("input#userPassword").fill("Automation@2025");
    await page.locator("#login").click();
    // await page.waitForLoadState("networkidle"); // wait for the page to load completely, otherwise below will give the blank list
    
    // alternatively we can also use waitFor() to wait for the element to be visible
    await page.locator("div.card-body b").first().waitFor(); // wait for the first element to be visible
    const allProducts = await page.locator("div.card-body b").allTextContents(); //[ 'ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO' ]
    console.log(allProducts);
    expect(allProducts).toContain("ADIDAS ORIGINAL");
});
