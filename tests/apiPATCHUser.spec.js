const { test, expect } = require("@playwright/test");

test("Update just User Name with PATCH", async ({ request }) => {
  const response = await request.patch("https://reqres.in/api/users/2", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    data: {
      name: "Paragya",
    },
  });

  console.log(await response.json());
  expect(response.status()).toBe(200);
  expect((await response.json()).name).toBe("Paragya");
});
