// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40*1000, // 40 seconds   overrides default timeout which is 30 seconds
  expect: {
    timeout: 50*1000, // 50 seconds for expect assertions , overrides default timeout which is 30 seconds
  },
  reporter: 'html', // Use HTML reporter for test results
 
  use: {
    browserName: 'chromium', // Use Chromium browser by default , can give firefox or webkit(for safari) as well
    headless: false, // Run tests in headful mode (visible browser), set to true for headless mode
  },
});

