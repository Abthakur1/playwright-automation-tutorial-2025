const {test, expect} = require('@playwright/test');

test.only("Ui Controls - Static Dropdown, checkbox check", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown =  page.locator("select.form-control");
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
