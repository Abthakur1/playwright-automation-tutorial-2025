class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator("div.card");
    this.cartLink = page.locator("button[routerlink='/dashboard/cart']");
    this.cartPage = page.locator("h1:has-text('My Cart')");
  }

  async selectProduct(productName) {
    const countOfProducts = await this.products.count();

    for (let i = 0; i < countOfProducts; i++) {
      const productTitle = await this.products
        .nth(i)
        .locator("b")
        .textContent(); // chain locators to get a particular product name
      console.log(productTitle);
      if (productTitle === productName) {
        await this.products
          .nth(i)
          .locator("button")
          .locator("text= Add To Cart")
          .click(); // click the add to cart button
        break;
      }
    }
  }

  async goToCart() {
    await this.cartLink.click(); // Go to cart
    await this.cartPage.waitFor(); // Wait for cart page to load
  }
}

module.exports = { DashBoardPage };
