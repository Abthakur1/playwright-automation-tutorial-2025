const { test, expect } = require("@playwright/test");

test("POST Create User", async ({ request }) => {
  const body = {
    name: "Abhishek",
    job: "Thakur",
  };
  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    data: body,
  });

  expect(response.status()).toBe(201);
  const respJson = await response.json();
  console.log(respJson);
});

test("Negative Test - POST Create User without header api key", async ({ request }) => {
  const body = {
    name: "Abhishek",
    job: "Thakur",
  };
  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
  expect(response.status()).toBe(401);
  const respJson = await response.json();
  expect(respJson.error).toBe("Missing API key");
});
