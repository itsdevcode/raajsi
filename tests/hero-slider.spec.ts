import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slider = (page: Page) =>
  page.getByRole("region", { name: "Featured collections" });
const heading = (page: Page) => slider(page).getByRole("heading", { level: 1 });
const titles = [
  "Some things are made.Others, inherited.",
  "Crafted by hands.Treasured for generations.",
  "Where tradition findsa new expression.",
];

async function leaveSlider(page: Page) {
  await page.mouse.move(0, 0);
  await page.getByRole("link", { name: "Raajsi home", exact: true }).focus();
}

test("all slides support manual, indicator, keyboard and CTA navigation without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(heading(page)).toHaveText(titles[0]);
  const next = slider(page).getByRole("button", {
    name: "Next slide",
    exact: true,
  });
  await next.focus();
  await page.keyboard.press("Enter");
  await expect(heading(page)).toHaveText(titles[1]);
  await expect(next).toBeFocused();
  await page.keyboard.press("Space");
  await expect(heading(page)).toHaveText(titles[2]);
  await next.click();
  await expect(heading(page)).toHaveText(titles[0]);
  await slider(page).getByRole("button", { name: "Previous slide" }).click();
  await expect(heading(page)).toHaveText(titles[2]);
  await slider(page)
    .getByRole("button", { name: /Show slide 2:/ })
    .click();
  await expect(heading(page)).toHaveText(titles[1]);
  await expect(
    slider(page).getByRole("button", { name: /Show slide 2:/ }),
  ).toHaveAttribute("aria-current", "true");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await slider(page).getByRole("link", { name: "Discover Our Story" }).click();
  await expect(page).toHaveURL(/#our-story$/);
  expect(errors).toEqual([]);
});

test("autoplay advances every 6.5 seconds, pauses on hover/focus, resumes and can be stopped explicitly", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("/");
  await expect(
    slider(page).getByRole("button", { name: "Pause autoplay" }),
  ).toBeVisible();
  await leaveSlider(page);
  await page.clock.fastForward(6400);
  await expect(heading(page)).toHaveText(titles[0]);
  await page.clock.fastForward(100);
  await expect(heading(page)).toHaveText(titles[1]);
  await slider(page).hover();
  await page.clock.fastForward(20000);
  await expect(heading(page)).toHaveText(titles[1]);
  await leaveSlider(page);
  await page.clock.fastForward(6500);
  await expect(heading(page)).toHaveText(titles[2]);
  await slider(page)
    .getByRole("button", { name: "Next slide", exact: true })
    .focus();
  await page.clock.fastForward(20000);
  await expect(heading(page)).toHaveText(titles[2]);
  await leaveSlider(page);
  await page.clock.fastForward(6500);
  await expect(heading(page)).toHaveText(titles[0]);
  await slider(page).getByRole("button", { name: "Pause autoplay" }).click();
  await leaveSlider(page);
  await page.clock.fastForward(20000);
  await expect(heading(page)).toHaveText(titles[0]);
  await slider(page).getByRole("button", { name: "Resume autoplay" }).click();
  await leaveSlider(page);
  await page.clock.fastForward(6500);
  await expect(heading(page)).toHaveText(titles[1]);
});

test("visibility events suspend autoplay and restart a full interval when visible", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.goto("/");
  await expect(
    slider(page).getByRole("button", { name: "Pause autoplay" }),
  ).toBeVisible();
  await leaveSlider(page);
  // Deterministic document-visibility simulation: browser tab throttling itself
  // is not exercised by this test, but the subscribed lifecycle is.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.fastForward(20000);
  await expect(heading(page)).toHaveText(titles[0]);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.fastForward(6400);
  await expect(heading(page)).toHaveText(titles[0]);
  await page.clock.fastForward(100);
  await expect(heading(page)).toHaveText(titles[1]);
});

test("reduced motion disables autoplay and crossfade while keeping controls usable", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    slider(page).getByRole("button", { name: "Pause autoplay" }),
  ).toHaveCount(0);
  await leaveSlider(page);
  await page.clock.fastForward(30000);
  await expect(heading(page)).toHaveText(titles[0]);
  await slider(page)
    .getByRole("button", { name: "Next slide", exact: true })
    .click();
  await expect(heading(page)).toHaveText(titles[1]);
  const transitions = await page
    .locator(".hero-panel, .hero-image-panel")
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).transitionDuration),
    );
  expect(transitions.every((value) => value === "0s")).toBe(true);
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`all three slides stay readable and stable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const start = await slider(page).boundingBox();
    for (let index = 0; index < 3; index++) {
      await slider(page)
        .getByRole("button", { name: new RegExp(`Show slide ${index + 1}:`) })
        .click();
      await expect(heading(page)).toHaveText(titles[index]);
      const bounds = await heading(page).evaluate((node) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const box = range.getBoundingClientRect();
        const parent = node.closest(".hero-copy")!.getBoundingClientRect();
        return {
          left: box.left,
          right: box.right,
          parentLeft: parent.left,
          parentRight: parent.right,
        };
      });
      expect(bounds.left).toBeGreaterThanOrEqual(bounds.parentLeft);
      expect(bounds.right).toBeLessThanOrEqual(bounds.parentRight);
      expect((await slider(page).boundingBox())?.height).toBe(start?.height);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const controls = await page.locator(".hero-controls").boundingBox();
      expect(controls!.x + controls!.width).toBeLessThanOrEqual(width);
      if (width === 390 || width === 1440) {
        await page
          .locator(".hero-image-panel.is-active img")
          .evaluate((img: HTMLImageElement) => img.decode());
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `docs/typography-hero-slider/slide-${index + 1}-${width}.png`,
        });
      }
    }
    const tinyText = await page.locator("body *").evaluateAll((nodes) =>
      nodes
        .filter(
          (node) =>
            node instanceof HTMLElement &&
            node.getClientRects().length &&
            getComputedStyle(node).visibility === "visible" &&
            !node.closest('[inert], [aria-hidden="true"], .sr-only') &&
            Array.from(node.childNodes).some(
              (child) =>
                child.nodeType === Node.TEXT_NODE && child.textContent?.trim(),
            ) &&
            parseFloat(getComputedStyle(node).fontSize) < 12,
        )
        .map((node) => ({
          tag: node.tagName,
          class: node.className,
          size: getComputedStyle(node).fontSize,
        })),
    );
    expect(tinyText).toEqual([]);
  });
}
