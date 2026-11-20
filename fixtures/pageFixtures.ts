import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

type PageFixtures = {
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    console.log('SETUP: creating HomePage');
    const homePage = new HomePage(page);
    console.log('TEARDOWN: test finished');
    await use(homePage);
  },
});

export { expect } from '@playwright/test';