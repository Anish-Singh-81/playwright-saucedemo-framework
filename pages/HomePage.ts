import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.open('/');
  }

  productLink(productName: string): Locator {
  return this.page.getByRole('link').filter({ hasText: productName }).first();
}

  async openProduct(productName: string): Promise<void> {
    await this.productLink(productName).click();
  }
}