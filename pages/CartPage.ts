import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly rows: Locator;
  readonly total: Locator;
  readonly updateButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'My Cart', level: 1 });
        this.rows = page
      .locator('#cart div.row')
      .filter({ has: page.locator('input[name="updates[]"]') });
    this.total = page.getByRole('heading', { name: /^Total/ });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.checkoutButton = page.getByRole('button', { name: 'Check Out' });
  }

  async goto(): Promise<void> {
    await this.open('/cart');
  }

  row(productName: string): Locator {
    return this.rows.filter({ hasText: productName });
  }

  linePrice(productName: string): Locator {
    return this.row(productName).locator('.price');
  }

  quantityInput(productName: string): Locator {
    return this.row(productName).locator('input[name="updates[]"]');
  }

  lineTotal(productName: string): Locator {
    return this.row(productName).locator('.total');
  }

  async setQuantity(productName: string, quantity: number): Promise<void> {
    await this.quantityInput(productName).fill(String(quantity));
    await this.updateButton.click();
  }

    async removeProduct(productName: string): Promise<void> {
    await this.row(productName).locator('a[href*="quantity=0"]').click();
  }
}