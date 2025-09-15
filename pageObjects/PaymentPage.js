class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentTitle = page.locator(".payment__title").first();
    this.userEmail = page.locator("div.details__user label");
    this.selectCountryDropdown = page.locator(
      'input[placeholder="Select Country"]'
    );
    this.dropdownOptions = page.locator("section[class*='ta-results']");
    this.placeOrderButton = page.getByText("Place Order ");
  }

  async waitForPaymentPage() {
    await this.paymentTitle.waitFor(); // Wait for payment page to load
  }

  async getUserEmail() {
    return await this.userEmail.textContent();
  }

  async selectCountry(inputOption, countryName) {
    await this.selectCountryDropdown.pressSequentially(inputOption);
    await this.dropdownOptions.waitFor();
    const totalOptions = await this.dropdownOptions.locator("button").count();
    for (let i = 0; i < totalOptions; i++) {
      const optionText = await this.dropdownOptions
        .locator("button")
        .nth(i)
        .textContent();
      if (optionText.trim() === countryName) {
        await this.dropdownOptions.locator("button").nth(i).click();
        break;
      }
    }
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { PaymentPage };
