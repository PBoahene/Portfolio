const { test, expect } = require('@playwright/test');
const serveOnce = require('./server');

let server;
test.beforeAll(async () => { server = await serveOnce(3000); });
test.afterAll(async () => { server.close(); });

test('navigation links scroll and active class toggles', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Click About
  await page.click('a.nav-link[href="#about"]');
  await page.waitForTimeout(300);
  // Ensure the URL hash updated (scrollIntoView doesn't always change hash but we rely on href)
  const active = await page.$eval('.nav-link.active', el => el.getAttribute('href'));
  expect(active).toBe('#about');
});
