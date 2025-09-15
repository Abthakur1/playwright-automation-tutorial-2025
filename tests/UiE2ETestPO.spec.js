const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");
const { DashBoardPage } = require("../pageObjects/DashBoardPage");
const { MyCartPage } = require("../pageObjects/MyCartPage");
const { PaymentPage } = require("../pageObjects/PaymentPage");
const { OrderCompletionPage } = require("../pageObjects/OrderCompletionPage");

test.only("UI E2E Test - ecommerce", async ({ page }) => {
  const loginPageObj = new LoginPage(page);
  const dahsboardPageObj = new DashBoardPage(page);
  const myCartPageObj = new MyCartPage(page);
  const paymentPageObj = new PaymentPage(page);
  const orderCompletionPageObj = new OrderCompletionPage(page);

  const username = "absk.cts@gmail.com";
  const password = "Automation@2025";

  await loginPageObj.goToLoginPage();
  await loginPageObj.validLogin(username, password);

  await dahsboardPageObj.selectProduct("iphone 13 pro");

  await dahsboardPageObj.goToCart();

  const itemOnMyCart = await myCartPageObj.getItemInCart();

  expect(itemOnMyCart).toBe("iphone 13 pro"); // Verify the item in cart


  await myCartPageObj.proceedToCheckout(); 

  await paymentPageObj.waitForPaymentPage();

  // Verify email id on shipping information
  const emailId = await paymentPageObj.getUserEmail();
  expect(emailId).toContain("absk.cts@gmail.com"); // Verify email id on shipping information

  await paymentPageObj.selectCountry("ind", "India");

  await paymentPageObj.placeOrder();


  const oderCompletioMessage = await orderCompletionPageObj.getOrderCompletionMessage()
  expect(oderCompletioMessage).toContain("Thankyou for the order.");

  const orderId = await orderCompletionPageObj.getOrderId();
  console.log("Order ID: " + orderId);
});
