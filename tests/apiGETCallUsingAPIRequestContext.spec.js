const { test, expect, request } = require("@playwright/test");

test("GET user list using APIRequestContext", async () => {
  // Create a new APIRequestContext
  const apiContext = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: { "x-api-key": "reqres-free-v1" },
  });

  // Send a GET request
  const response = await apiContext.get("/api/users?page=2");

  // Assert the response status
  expect(response.status()).toBe(200);

  // Parse and validate the response body
  const responseBody = await response.json();
  expect(responseBody.data.length).toBeGreaterThan(0);

  // Dispose the API context
  await apiContext.dispose();
});

test("GET with custom APIRequestContext", async () => {
  const apiContext = await request.newContext({
    baseURL: "https://reqres.in/api",
    extraHTTPHeaders: { Authorization: "Bearer token" },
  });
  const response = await apiContext.get("/users?page=2");
  console.log(await response.json());
});
