import { test, expect } from '../../fixtures/pageFixtures';
import { step, businessInfo } from '../../utils/reportUtils';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const products: Product[] = productsData;

test.describe('Catalog', () => {

  test('TC02 - catalog lists all expected products @regression', async ({ catalogPage, page }) => {
    await businessInfo({
      feature: 'Catalog',
      story: 'Customer browses all products',
      severity: 'normal',
      description: 'Customer opens the full catalog and can see every product we sell',
    });

    await step(page, 'Open the catalog page', async () => {
      await catalogPage.goto();
      await expect(page).toHaveURL(/\/collections\/all/);
    });

    for (const product of products) {
      await step(page, `Verify "${product.name}" is listed in the catalog`, async () => {
        await expect(catalogPage.productLink(product.name)).toBeVisible();
      }, [catalogPage.productLink(product.name)]);
    }
  });

});