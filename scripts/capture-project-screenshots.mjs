/**
 * Captures local WebP screenshots for every portfolio project.
 * Run: npm run screenshots
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const projects = [
  {
    slug: "wordpress-portfolio-headless",
    deployUrl: "https://elli-wordpress-portfolio.vercel.app",
  },
  {
    slug: "pokemon-search-app",
    deployUrl: "https://pokemon-search-application.netlify.app",
  },
  {
    slug: "advokatbyra-site",
    deployUrl: "https://w-advokatbyra-malmo.netlify.app",
  },
  {
    slug: "nextjs-auth-blog-modernized",
    deployUrl: "https://my-nextjs-project-modernized.netlify.app",
  },
  { slug: "auth-blog-platform", deployUrl: "https://auth-blog-platform.netlify.app" },
  {
    slug: "calculator-app",
    deployUrl: "https://calculator-app-elli2022.netlify.app",
  },
  { slug: "nic-cage-snacks-shop", deployUrl: "https://nic-cage-snacks.netlify.app" },
];

const root = process.cwd();
const outRoot = path.join(root, "public", "screenshots", "projects");

const viewports = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
  thumb: { width: 640, height: 360 },
};

async function captureProject(browser, project) {
  const outDir = path.join(outRoot, project.slug);
  await mkdir(outDir, { recursive: true });

  for (const [variant, viewport] of Object.entries(viewports)) {
    const page = await browser.newPage();
    try {
      await page.setViewportSize(viewport);
      await page.goto(project.deployUrl, {
        waitUntil: "domcontentloaded",
        timeout: 90_000,
      });
      await page.waitForTimeout(2500);
      const file = path.join(outDir, `${variant}.png`);
      await page.screenshot({ path: file, type: "png", fullPage: false });
      console.log(`✓ ${project.slug} → ${variant}.png`);
    } catch (error) {
      console.warn(`✗ ${project.slug} ${variant}:`, error.message);
    } finally {
      await page.close();
    }
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const project of projects) {
      await captureProject(browser, project);
    }
  } finally {
    await browser.close();
  }
  console.log("Done. Commit public/screenshots/projects/ for reliable thumbnails.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
