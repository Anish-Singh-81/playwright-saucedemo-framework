import { test, expect } from '../../fixtures/pageFixtures';
import { step, businessInfo } from '../../utils/reportUtils';
import * as allure from 'allure-js-commons';
import productsData from '../../test-data/products.json';
import { Product } from '../../test-data/types';

const products: Product[] = productsData;

test.describe('Product details', () => {

  for (const product of products) {
    test(`TC03 - ${product.name} page shows correct name and price @regression`, async ({ productPage, page }) => {
      await businessInfo({
        feature: 'Product details',
        story: 'Customer views product information',
        severity: 'critical',
        description: `Customer opens the ${product.name} page and sees the correct name, price and an available Add to Cart button`,
      });
      await allure.parameter('Product', product.name);
      await allure.parameter('Expected price', `£${product.price.toFixed(2)}`);

      await step(page, `Open the "${product.name}" product page`, async () => {
        await productPage.goto(product.slug);
      });

      await step(page, `Verify the product name is "${product.name}"`, async () => {
        await expect(productPage.title).toHaveText(product.name);
      }, [productPage.title]);

      await step(page, `Verify the price is £${product.price.toFixed(2)}`, async () => {
        expect(await productPage.getPrice()).toBe(product.price);
      }, [productPage.price]);

      await step(page, 'Verify "Add to Cart" is available', async () => {
        await expect(productPage.addToCartButton).toBeEnabled();
      }, [productPage.addToCartButton]);
    });
  }

});