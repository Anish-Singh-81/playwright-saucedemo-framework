import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,              // max time for one whole test
  expect: { timeout: 5_000 },   // max time for one assertion

  reporter: [
  ['list'],
  ['html', { open: 'never' }],
  ['allure-playwright', {
    resultsDir: 'allure-results',
    environmentInfo: {
      Application: 'Sauce Demo (Shopify)',
      URL: 'https://sauce-demo.myshopify.com',
      Browser: 'Chromium',
      Environment: 'Production demo store',
    },
  }],
],

  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    //trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,      // max time for one click / fill
    trace: 'retain-on-failure',
    launchOptions: {
  slowMo: Number(process.env.SLOWMO ?? 0),
  
},

  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});