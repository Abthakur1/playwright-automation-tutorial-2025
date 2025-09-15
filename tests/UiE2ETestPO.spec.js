//1.Goto https://rahulshettyacademy.com/client
//2.sign in
//3.select the product IPHONE 13 PRO dynamically
//4.Click add to cart
//5.Go to cart and verify that the same item which you added is showing into the my cart.
//6.Checkout
//7.Verify that the same email id is shown on Shipping Information.
//8.select country in the dynamic dropdown
//9.Apply coupon "rahulshettyacademy"
//10.Verify the coupon applied successfully.
//11.Place order
// 12.Verify the message "Thankyou for the order."
// 13. capture order id.
// 14. Go to order history page.
// 15. Check where is that order presents with order id.
// 16. Once found go and view the order and verify

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
