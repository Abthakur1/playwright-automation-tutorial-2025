class LoginPage {
  constructor(page) {
    this.page = page;
    this.userIdField = page.locator("#userEmail");
    this.passwordField = page.locator("#userPassword");
    this.loginButton = page.locator("#login");
  }

  async goToLoginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username, password) {
    await this.userIdField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };