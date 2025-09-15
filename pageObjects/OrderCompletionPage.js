class OrderCompletionPage {
  constructor(page) {
    this.page = page;
    this.orderCompletionMessage = page.locator('h1[class="hero-primary"]');
    this.orderId = page.locator("td[class='em-spacer-1'] label").nth(1);
  }

  async getOrderCompletionMessage() {
    return await this.orderCompletionMessage.textContent();
  }

  async getOrderId() {
    return await this.orderId.textContent();
  }
}

module.exports = { OrderCompletionPage };
