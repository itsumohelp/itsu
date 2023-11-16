import { test, expect } from '@playwright/test'
 
test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:5556/')
  await expect(page.locator('h1')).toContainText('知識を可視しよう')
})