import { test, Page, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

type Severity = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

type BusinessInfo = {
  feature: string;
  story: string;
  severity: Severity;
  description: string;
};

export async function businessInfo(info: BusinessInfo): Promise<void> {
  await allure.epic('Sauce Demo online store');
  await allure.feature(info.feature);
  await allure.story(info.story);
  await allure.severity(info.severity);
  await allure.owner('Anish Singh');
  await allure.description(info.description);
  test.info().annotations.push({ type: 'Scenario', description: info.description });
}

export async function step(
  page: Page,
  title: string,
  action: () => Promise<void>,
  highlight: Locator[] = [],
): Promise<void> {
  await test.step(title, async () => {
    await action();

    await setOutline(highlight, true);
    const screenshot = await page.screenshot();
    await setOutline(highlight, false);

    await test.info().attach(title, { body: screenshot, contentType: 'image/png' });
  });
}

async function setOutline(locators: Locator[], on: boolean): Promise<void> {
  for (const locator of locators) {
    try {
      if (on) {
        await locator.first().scrollIntoViewIfNeeded({ timeout: 2_000 });
      }
      await locator.evaluateAll((elements, show) => {
        for (const element of elements) {
          const el = element as HTMLElement;
          if (show) {
            el.style.setProperty('outline', '3px solid red', 'important');
            el.style.setProperty('outline-offset', '2px', 'important');
          } else {
            el.style.removeProperty('outline');
            el.style.removeProperty('outline-offset');
          }
        }
      }, on);
        } catch (error) {
      console.warn(`⚠️ Highlight skipped: ${(error as Error).message}`);
    }
  }
}