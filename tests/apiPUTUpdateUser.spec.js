const { test, expect } = require("@playwright/test");

test("PUT Update User", async ({ request }) => {
  const updatedBody = {
    name: "Abhishek",
    job: "software engineer",
  };
  const response = await request.put("https://reqres.in/api/users/2", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    data: updatedBody,
  });

  expect(response.status()).toBe(200);
  console.log(await response.json());
  expect((await response.json()).name).toBe("Abhishek");
  expect((await response.json()).job).toBe("software engineer");
});
