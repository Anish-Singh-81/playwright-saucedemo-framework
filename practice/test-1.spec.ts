import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1794853044117');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('ABCA');
  await page.locator('iframe[name="a-xadehapzobid"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-xadehapzobid"]').contentFrame().locator('[id="0"]').click();
  await page.locator('iframe[name="c-xadehapzobid"]').contentFrame().locator('[id="1"]').click();
  await page.locator('iframe[name="c-xadehapzobid"]').contentFrame().locator('[id="8"]').click();
  await page.locator('iframe[name="c-xadehapzobid"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.locator('iframe[name="c-xadehapzobid"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
});