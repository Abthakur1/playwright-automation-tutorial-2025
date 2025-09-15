class MyCartPage {
    constructor(page) {
        this.page = page;
        this.cartSection = page.locator("div.cartSection h3");
        this.checkoutButton = page.getByText("Checkout");
    }

    async getItemInCart() {
        return await this.cartSection.textContent();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { MyCartPage };