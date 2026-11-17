import { test, expect } from '@playwright/test';

test('TC00 - application is reachable @smoke', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  await expect(page).toHaveTitle(/Sauce Demo/i);
});