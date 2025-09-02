const { test, expect } = require("@playwright/test");

test("GET Call", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  expect(response.status()).toBe(200);
  const respJson = await response.json();
  //   console.log(respJson);
  expect(respJson.total).toBe(12);

  const respData = respJson.data;
  console.log(respData);

  // get by ID = 10

  // verify that respData has user with id = 10

  expect(respData.some((user) => user.id === 10)).toBe(true);

  respData.forEach((user) => {
    if (user.id === 10) {
      expect(user.first_name).toBe("Byron");
      expect(user.last_name).toBe("Fields");
      expect(user.email).toBe("byron.fields@reqres.in");
    }
  });
});

test("GET call with Headers", async ({ request }) => {
  const response = await request.get(
    "https://api.github.com/repos/microsoft/playwright",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "playwright-test",
      },
    }
  );
  expect(response.status()).toBe(200);
  const respJson = await response.json();
  console.log(respJson);

  // verify full_name = microsoft/playwright
  // verify private = false
  expect(respJson.full_name).toBe("microsoft/playwright");
  expect(respJson.private).toBe(false);

  // verify licence
  
  expect(respJson.license.key).toBe('apache-2.0');
  expect(respJson.license.name).toBe('Apache License 2.0');

  // get the topics list and verify that it contains "playwright" and "testing"

  const respData = respJson.topics;
  console.log(respData);

  expect(respData).toContain("playwright");
  expect(respData).toContain("testing");
});
