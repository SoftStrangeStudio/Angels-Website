#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_ROUTES = ["/", "/about/", "/notes/", "/portfolio/", "/store/"];
const DEFAULT_VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 }
];

function parseArgs(argv) {
  const args = {
    base: "https://softstrangestudio.github.io/Angels-Website/",
    out: "logs",
    routes: DEFAULT_ROUTES,
    timeout: 45000,
    headed: false,
    trace: true,
    snapshot: true
  };

  for (const raw of argv) {
    if (raw === "--headed") args.headed = true;
    if (raw === "--no-trace") args.trace = false;
    if (raw === "--no-cdp-snapshot") args.snapshot = false;
    if (raw.startsWith("--base=")) args.base = raw.slice("--base=".length);
    if (raw.startsWith("--out=")) args.out = raw.slice("--out=".length);
    if (raw.startsWith("--timeout=")) args.timeout = Number(raw.slice("--timeout=".length));
    if (raw.startsWith("--routes=")) {
      args.routes = raw
        .slice("--routes=".length)
        .split(",")
        .map((route) => route.trim())
        .filter(Boolean);
    }
  }

  return args;
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function routeUrl(base, route) {
  const normalizedBase = ensureTrailingSlash(base);
  const normalizedRoute = route.replace(/^\/Angels-Website\/?/, "").replace(/^\//, "");
  return new URL(normalizedRoute, normalizedBase).toString();
}

function safeName(input) {
  return input
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "home";
}

function nowStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function mkdirp(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(file, data) {
  await mkdirp(path.dirname(file));
  await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function appendNdjson(file, data) {
  await mkdirp(path.dirname(file));
  await fs.appendFile(file, `${JSON.stringify(data)}\n`, "utf8");
}

function trimText(value, max = 240) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

async function captureLayout(page) {
  return page.evaluate(() => {
    const textOf = (element) => element?.textContent?.replace(/\s+/g, " ").trim() || "";
    const rectOf = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    };

    const headings = Array.from(document.querySelectorAll("h1,h2,h3"), (element) => ({
      tag: element.tagName.toLowerCase(),
      text: textOf(element).slice(0, 180),
      id: element.id || null,
      className: element.className || null,
      rect: rectOf(element)
    }));

    const links = Array.from(document.querySelectorAll("a[href]"), (element) => ({
      text: textOf(element).slice(0, 120),
      href: element.getAttribute("href"),
      rect: rectOf(element)
    })).slice(0, 80);

    const largeElements = Array.from(document.body.querySelectorAll("body *"))
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        className: String(element.className || "").slice(0, 160),
        text: textOf(element).slice(0, 120),
        rect: rectOf(element)
      }))
      .filter((item) => item.rect.width > window.innerWidth * 0.75 || item.rect.height > window.innerHeight * 0.55)
      .slice(0, 40);

    return {
      title: document.title,
      url: location.href,
      bodyTextLength: document.body.innerText.length,
      visibleTextSample: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 2500),
      viewport: { width: window.innerWidth, height: window.innerHeight },
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
      },
      counts: {
        headings: headings.length,
        links: document.querySelectorAll("a[href]").length,
        buttons: document.querySelectorAll("button").length,
        images: document.querySelectorAll("img").length,
        sections: document.querySelectorAll("section").length,
        cards: document.querySelectorAll('[class*="card"], [class*="note"], [class*="piece"], [class*="slip"]').length,
        liveRegions: document.querySelectorAll('[aria-live]').length
      },
      headings,
      links,
      largeElements
    };
  });
}

async function captureAnimations(page) {
  return page.evaluate(() => {
    return document.getAnimations({ subtree: true }).map((animation) => {
      const effect = animation.effect;
      const target = effect?.target;
      const timing = effect?.getTiming?.() || {};
      return {
        playState: animation.playState,
        currentTime: animation.currentTime,
        startTime: animation.startTime,
        target: target
          ? {
              tag: target.tagName?.toLowerCase?.() || null,
              id: target.id || null,
              className: String(target.className || "").slice(0, 160)
            }
          : null,
        timing: {
          delay: timing.delay,
          duration: timing.duration,
          easing: timing.easing,
          iterations: timing.iterations,
          fill: timing.fill
        }
      };
    });
  });
}

async function captureInteractions(page) {
  const interactions = [];

  const push = async (step, data = {}) => {
    interactions.push({ step, at: new Date().toISOString(), ...data });
  };

  await push("initial", { url: page.url() });
  await page.mouse.move(120, 120);
  await push("mouse-move", { x: 120, y: 120 });

  const hoverTargets = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors
      .filter((anchor) => {
        const rect = anchor.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .slice(0, 8)
      .map((anchor, index) => ({ index, text: anchor.textContent?.replace(/\s+/g, " ").trim().slice(0, 80), href: anchor.getAttribute("href") }))
  );

  for (const target of hoverTargets) {
    try {
      await page.locator("a[href]").nth(target.index).hover({ timeout: 1500 });
      await push("hover-link", target);
    } catch (error) {
      await push("hover-link-failed", { ...target, error: error.message });
    }
  }

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    const active = await page.evaluate(() => {
      const element = document.activeElement;
      return {
        tag: element?.tagName?.toLowerCase?.() || null,
        text: element?.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) || "",
        href: element?.getAttribute?.("href") || null,
        className: String(element?.className || "").slice(0, 120)
      };
    });
    await push("keyboard-tab", { index: index + 1, active });
  }

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const stops = [Math.round(scrollHeight * 0.33), Math.round(scrollHeight * 0.66), Math.max(0, scrollHeight - viewportHeight)];

  for (const y of stops) {
    await page.evaluate((targetY) => window.scrollTo({ top: targetY, left: 0, behavior: "instant" }), y);
    await page.waitForTimeout(200);
    await push("scroll", { y });
  }

  await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
  await push("return-top");

  return interactions;
}

async function auditRoute(browser, runDir, base, route, viewport, options) {
  const url = routeUrl(base, route);
  const routeName = safeName(`${route}-${viewport.name}`);
  const routeDir = path.join(runDir, "routes", routeName);
  const screenshotDir = path.join(routeDir, "screenshots");
  const traceDir = path.join(routeDir, "traces");
  const htmlDir = path.join(routeDir, "html");

  await Promise.all([mkdirp(screenshotDir), mkdirp(traceDir), mkdirp(htmlDir)]);

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference"
  });

  if (options.trace) {
    await context.tracing.start({ screenshots: true, snapshots: true, sources: false });
  }

  const page = await context.newPage();
  page.setDefaultTimeout(options.timeout);

  const consoleFile = path.join(routeDir, "console.ndjson");
  const networkFile = path.join(routeDir, "network.ndjson");
  const cdpFile = path.join(routeDir, "cdp-events.ndjson");

  page.on("console", (message) => {
    appendNdjson(consoleFile, {
      at: new Date().toISOString(),
      type: message.type(),
      text: trimText(message.text(), 1000),
      location: message.location()
    }).catch(() => {});
  });

  page.on("requestfailed", (request) => {
    appendNdjson(networkFile, {
      at: new Date().toISOString(),
      event: "requestfailed",
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      failure: request.failure()
    }).catch(() => {});
  });

  page.on("response", (response) => {
    const status = response.status();
    if (status >= 400) {
      appendNdjson(networkFile, {
        at: new Date().toISOString(),
        event: "bad-response",
        url: response.url(),
        status,
        statusText: response.statusText(),
        request: {
          method: response.request().method(),
          resourceType: response.request().resourceType()
        }
      }).catch(() => {});
    }
  });

  const cdp = await context.newCDPSession(page);
  const cdpEvents = [
    "Page.domContentEventFired",
    "Page.loadEventFired",
    "Runtime.exceptionThrown",
    "Log.entryAdded",
    "Network.loadingFailed",
    "Network.responseReceived"
  ];

  for (const eventName of cdpEvents) {
    cdp.on(eventName, (payload) => {
      appendNdjson(cdpFile, { at: new Date().toISOString(), event: eventName, payload }).catch(() => {});
    });
  }

  await Promise.all([
    cdp.send("Page.enable"),
    cdp.send("Network.enable"),
    cdp.send("Runtime.enable"),
    cdp.send("Log.enable"),
    cdp.send("Performance.enable"),
    cdp.send("DOM.enable")
  ]);

  const result = {
    route,
    url,
    viewport,
    ok: false,
    status: null,
    error: null,
    startedAt: new Date().toISOString(),
    finishedAt: null
  };

  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: options.timeout });
    result.status = response?.status() || null;
    await page.waitForLoadState("networkidle", { timeout: Math.min(options.timeout, 15000) }).catch(() => {});

    const html = await page.content();
    await fs.writeFile(path.join(htmlDir, "document.html"), html, "utf8");

    await page.screenshot({ path: path.join(screenshotDir, "initial.png"), fullPage: true });

    const interactions = await captureInteractions(page);
    await writeJson(path.join(routeDir, "interaction.json"), interactions);

    await page.screenshot({ path: path.join(screenshotDir, "after-interaction.png"), fullPage: true });

    const accessibility = page.accessibility?.snapshot
      ? await page.accessibility.snapshot({ interestingOnly: false }).catch((error) => ({ error: error.message }))
      : { error: "page.accessibility.snapshot unavailable in this Playwright environment" };

    const [layout, animations, performanceMetrics] = await Promise.all([
      captureLayout(page),
      captureAnimations(page),
      cdp.send("Performance.getMetrics").catch((error) => ({ error: error.message }))
    ]);

    await writeJson(path.join(routeDir, "layout.json"), layout);
    await writeJson(path.join(routeDir, "animations.json"), animations);
    await writeJson(path.join(routeDir, "accessibility-snapshot.json"), accessibility);
    await writeJson(path.join(routeDir, "performance.json"), performanceMetrics);

    if (options.snapshot) {
      const snapshot = await cdp
        .send("DOMSnapshot.captureSnapshot", {
          computedStyles: ["display", "position", "opacity", "transform", "width", "height", "overflow"]
        })
        .catch((error) => ({ error: error.message }));
      await writeJson(path.join(routeDir, "dom-snapshot.json"), snapshot);
    }

    result.ok = Boolean(result.status && result.status < 400);
    result.layout = {
      horizontalOverflow: layout.document.horizontalOverflow,
      scrollHeight: layout.document.scrollHeight,
      headings: layout.counts.headings,
      links: layout.counts.links,
      sections: layout.counts.sections,
      cards: layout.counts.cards
    };
    result.animations = { count: animations.length };
  } catch (error) {
    result.error = error.message;
    await writeJson(path.join(routeDir, "error.json"), { message: error.message, stack: error.stack });
  } finally {
    result.finishedAt = new Date().toISOString();

    if (options.trace) {
      await context.tracing.stop({ path: path.join(traceDir, "trace.zip") }).catch(() => {});
    }

    await cdp.detach().catch(() => {});
    await context.close().catch(() => {});
  }

  await writeJson(path.join(routeDir, "summary.json"), result);
  return result;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const runId = nowStamp();
  const runDir = path.join(options.out, runId);
  await mkdirp(runDir);

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch (error) {
    console.error("Playwright is not installed. Run npm install, then npx playwright install chromium.");
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const browser = await chromium.launch({ headless: !options.headed });
  const results = [];

  try {
    for (const route of options.routes) {
      for (const viewport of DEFAULT_VIEWPORTS) {
        console.log(`Auditing ${routeUrl(options.base, route)} at ${viewport.name}...`);
        results.push(await auditRoute(browser, runDir, options.base, route, viewport, options));
      }
    }
  } finally {
    await browser.close();
  }

  const summary = {
    runId,
    base: options.base,
    routes: options.routes,
    viewports: DEFAULT_VIEWPORTS,
    generatedAt: new Date().toISOString(),
    ok: results.every((result) => result.ok),
    totals: {
      routes: results.length,
      failed: results.filter((result) => !result.ok).length,
      horizontalOverflow: results.filter((result) => result.layout?.horizontalOverflow).length,
      animations: results.reduce((sum, result) => sum + (result.animations?.count || 0), 0)
    },
    results
  };

  await writeJson(path.join(runDir, "summary.json"), summary);
  await writeJson(path.join(options.out, "latest-summary.json"), summary);
  console.log(`Audit written to ${runDir}`);

  if (!summary.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
