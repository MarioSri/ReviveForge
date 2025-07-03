import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('Marketplace page has no axe violations', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});
