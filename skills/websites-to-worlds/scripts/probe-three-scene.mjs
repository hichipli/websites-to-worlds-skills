#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';

const { values } = parseArgs({
  options: {
    url: { type: 'string' },
    out: { type: 'string', default: '/tmp/websites-to-worlds-probe' },
    'start-selector': { type: 'string' },
    'wait-ms': { type: 'string', default: '3500' },
    'after-start-ms': { type: 'string', default: '1800' },
    strict: { type: 'boolean', default: false },
    mobile: { type: 'boolean', default: false }
  }
});

if (!values.url) {
  console.error('Usage: node probe-three-scene.mjs --url http://localhost:8765/route/ [--start-selector "#board-btn"] [--out /tmp/probe]');
  process.exit(2);
}

async function loadPlaywright() {
  const req = createRequire(resolve(process.cwd(), 'package.json'));
  for (const name of ['playwright', 'playwright-core']) {
    try {
      return await import(pathToFileURL(req.resolve(name)));
    } catch {}
  }
  for (const name of ['playwright', 'playwright-core']) {
    try {
      return await import(name);
    } catch {}
  }
  console.error('Playwright is required. Install it in the calling project or a temp folder with: npm i playwright');
  process.exit(2);
}

const playwright = await loadPlaywright();
const chromium = playwright.chromium || playwright.default?.chromium;
if (!chromium) {
  console.error('Could not find chromium in the loaded Playwright module.');
  process.exit(2);
}
const outDir = resolve(values.out);
mkdirSync(outDir, { recursive: true });

const launchOptions = {
  headless: true,
  args: [
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--disable-dev-shm-usage',
    '--no-sandbox'
  ]
};

if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) {
  launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
}

const browser = await chromium.launch(launchOptions);
const viewport = values.mobile ? { width: 390, height: 844 } : { width: 1440, height: 860 };
const page = await browser.newPage({ viewport, isMobile: values.mobile, hasTouch: values.mobile });

const consoleMessages = [];
page.on('console', (msg) => {
  if (['error', 'warning'].includes(msg.type())) {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  }
});
page.on('pageerror', (err) => {
  consoleMessages.push({ type: 'pageerror', text: err.message });
});

await page.goto(values.url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(Number(values['wait-ms']));
await page.screenshot({ path: `${outDir}/01-entry.png`, fullPage: false });

let started = false;
if (values['start-selector']) {
  const start = page.locator(values['start-selector']).first();
  if (await start.isVisible().catch(() => false)) {
    await start.click();
    started = true;
    await page.waitForTimeout(Number(values['after-start-ms']));
    await page.screenshot({ path: `${outDir}/02-started.png`, fullPage: false });
  }
}

const report = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll('canvas')].map((canvas) => {
    const rect = canvas.getBoundingClientRect();
    return {
      id: canvas.id || null,
      width: canvas.width,
      height: canvas.height,
      cssWidth: Math.round(rect.width),
      cssHeight: Math.round(rect.height),
      visible: rect.width > 0 && rect.height > 0
    };
  });

  const scene = window.__scene;
  const sceneStats = scene ? { meshes: 0, lights: 0, materials: 0 } : null;
  if (scene) {
    const materials = new Set();
    scene.traverse((obj) => {
      if (obj.isMesh) {
        sceneStats.meshes += 1;
        if (Array.isArray(obj.material)) obj.material.forEach((m) => materials.add(m.uuid));
        else if (obj.material) materials.add(obj.material.uuid);
      }
      if (obj.isLight) sceneStats.lights += 1;
    });
    sceneStats.materials = materials.size;
  }

  return {
    title: document.title,
    url: location.href,
    canvases,
    sceneStats,
    bodyTextSample: document.body.innerText.replace(/\s+/g, ' ').slice(0, 400)
  };
});

const finalReport = {
  url: values.url,
  viewport,
  started,
  consoleMessages,
  ...report
};

writeFileSync(`${outDir}/report.json`, JSON.stringify(finalReport, null, 2));
await browser.close();

const actionable = consoleMessages.filter((m) => m.type === 'error' || m.type === 'pageerror');
console.log(`Websites to Worlds probe wrote ${outDir}`);
console.log(`Canvases: ${report.canvases.length}; started: ${started}; actionable errors: ${actionable.length}`);
if (values.strict && actionable.length) process.exit(1);
