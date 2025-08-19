const { test, expect } = require("@playwright/test");

test("Ui Controls - Static Dropdown, checkbox check", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  // await dropdown.selectText("Consultant"); // This will also select the option with value "consult"
  const selectedValue = await dropdown.inputValue();
  console.log(`Selected value: ${selectedValue}`); // Should print "consult"
  expect(selectedValue).toBe("consult");
  await page.locator("#terms").check();
  // verify the checkbox is checked
  expect(await page.locator("#terms").isChecked()).toBe(true);
  await page.locator("#terms").uncheck();
  // verify the checkbox is unchecked
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
});

test("Ui Controls - Handling child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.getByText(
    "Free Access to InterviewQues/ResumeAssistance/Material"
  );

  const newPage = await Promise.all([               // array of promises with the new page
    context.waitForEvent("page"), // wait for the new page
     documentLink.click(), // once it is clicked, it will open a new tab    
  ]);
    await newPage[0].waitForLoadState("networkidle");
    const newPageTitle = await newPage[0].title();
    console.log(`New page title: ${newPageTitle}`); // Should print the title
    expect(newPageTitle).toContain("RS Academy");

    await newPage[0].locator("ul[class='navigation clearfix'] a[href*='courses']").first().click();

    const browseProductField = newPage[0].locator("#heap_product-search");

    // wait for the input field to be visible and then verify it is visible
    await browseProductField.waitFor();
    expect(await browseProductField.isVisible()).toBeTruthy();

    await newPage[0].close(); // close the new page
    
    //main page
    const mainPageTitle = await page.title();
    console.log(`Main page title: ${mainPageTitle}`); // Should print the title
    expect(mainPageTitle).toContain("LoginPage Practise | Rahul Shetty Academy");
});
