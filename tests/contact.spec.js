const { test, expect } = require('@playwright/test');
const serveOnce = require('./server');

let server;
test.beforeAll(async () => { server = await serveOnce(3000); });
test.afterAll(async () => { server.close(); });

test('contact form submits to serverless endpoint', async ({ page }) => {
  await page.route('**/api/sendEmail', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: 'sent (mock)' }) }));
  await page.goto('http://localhost:3000');
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@example.com');
  await page.fill('#message', 'Hello from test');
  await page.click('button[type="submit"]');
  // Wait for the alert to appear — Playwright handles dialogs
  page.on('dialog', async dialog => { expect(dialog.message()).toContain('sent'); await dialog.dismiss(); });
  // small delay to let script perform fetch
  await page.waitForTimeout(500);
});
