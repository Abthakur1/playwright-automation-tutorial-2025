const { test, expect } = require("@playwright/test");

test("Ntwork intercept call for demoblaze", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.locator('a[id="nava"]').waitFor();
  const homePageLogo = await page.locator('a[id="nava"]').textContent();

  // verify the logo text
  expect(homePageLogo).toContain("PRODUCT STORE");

  // Now go to Phones category and intercept the API call to show only 1 product - Iphone 6 with mocked description

  // api endpoint: https://api.demoblaze.com/bycat, POST call

  const mockedData = {
    Items: [
      {
        cat: "phone",
        desc: "This is Apple I phone 6 - Mocked description",
        id: 1,
        img: "imgs/iphone_6.jpg",
        price: 790.0,
        title: "Iphone 6 32gb",
      },
    ],
  };

  // Intercept the POST request to the product list API endpoint
  await page.route("https://api.demoblaze.com/bycat", async (route) => {
    // Fulfill the intercepted request with the mocked response
    await route.fulfill({
      status: 200, // Set the HTTP status code to 200 (OK)
      contentType: "application/json", // Specify the content type as JSON
      body: JSON.stringify(mockedData), // Send the mocked data as a JSON string in the response body
    });
  });

  // After setting up the route, click on the Phones category to trigger the API call
  await page.locator(`#itemc[onclick="byCat('phone')"]`).click();
  const iPhoneMockedDescription = await page.locator("p[id='article']").textContent();
  const actualDescription =  iPhoneMockedDescription.trim(); 
  expect(actualDescription).toContain("This is Apple I phone 6 - Mocked description");
});
