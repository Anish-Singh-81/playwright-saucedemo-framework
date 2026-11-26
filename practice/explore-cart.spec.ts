import { test } from '@playwright/test';

test('explore cart page', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/products/grey-jacket');
  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.waitForLoadState('networkidle');
  console.log('URL AFTER ADD TO CART:', page.url());

  await page.goto('https://sauce-demo.myshopify.com/cart');

  console.log('===== ARIA SNAPSHOT =====');
  console.log(await page.locator('body').ariaSnapshot());

  console.log('===== CART FORM HTML =====');
  console.log(await page.locator('form[action="/cart"]').first().innerHTML());
});