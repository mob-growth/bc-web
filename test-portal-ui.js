import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testPortalUI() {
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'portal-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const pages = [
    { name: 'Dashboard', url: 'http://localhost:4321/portal/' },
    { name: 'My Courses', url: 'http://localhost:4321/portal/courses' },
    { name: 'Progress', url: 'http://localhost:4321/portal/progress' },
    { name: 'Achievements', url: 'http://localhost:4321/portal/achievements' },
    { name: 'Schedule', url: 'http://localhost:4321/portal/schedule' },
    { name: 'Assignments', url: 'http://localhost:4321/portal/assignments' },
    { name: 'Resources', url: 'http://localhost:4321/portal/resources' },
    { name: 'Settings', url: 'http://localhost:4321/portal/settings' }
  ];

  console.log('Starting portal UI testing...\n');

  for (const pageInfo of pages) {
    try {
      console.log(`Navigating to ${pageInfo.name} (${pageInfo.url})...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 10000 });

      // Wait a bit for any animations or dynamic content
      await page.waitForTimeout(1000);

      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${pageInfo.name.toLowerCase().replace(' ', '-')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);

      // Get page dimensions and other useful info
      const dimensions = await page.evaluate(() => {
        return {
          scrollHeight: document.documentElement.scrollHeight,
          clientHeight: document.documentElement.clientHeight,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        };
      });
      console.log(`Page dimensions:`, dimensions);
      console.log('---\n');

    } catch (error) {
      console.error(`Error on ${pageInfo.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('Testing complete! Screenshots saved in:', screenshotsDir);
}

testPortalUI().catch(console.error);
