const {test, expect} = require('@playwright/test');

test('GET User List', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/2', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    });
    expect(response.status()).toBe(200);

    const respJson = await response.json();
    const respData = respJson.data;
    console.log(respData);
    expect(respData.id).toBe(2);
    expect(respData.first_name).toBe('Janet');
    expect(respData.last_name).toBe('Weaver');

});

test('Negative Test - GET User List without api key', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/500', {
        headers: {
            'Content-Type': 'application/json',
            // 'x-api-key': 'reqres-free-v1'
        }
    });
  expect(response.status()).toBe(401);
  expect(await response.json()).toEqual({ error: 'Missing API key' });
});

test('Negative Test - GET User List with invalid id', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/500', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    });
  console.log(response.status());
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({});
});