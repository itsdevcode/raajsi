import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage and desktop collection navigation work on the static export", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Others, inherited.",
  );
  const menu = page.getByRole("button", { name: "Collections", exact: true });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page
    .locator("#collection-menu")
    .getByRole("link", { name: "Brass & copper" })
    .click();
  await expect(page).toHaveURL(/#brass$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("link", { name: "Our story", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#our-story$/);
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  expect(errors).toEqual([]);
});

test("newsletter validates email and discloses the demonstration outcome", async ({
  page,
}) => {
  await page.goto("/#newsletter");
  const input = page.getByRole("textbox", { name: "Your email address" });
  await input.fill("invalid");
  await page.getByRole("button", { name: "Join the newsletter" }).click();
  await expect(input).toBeVisible();
  expect(
    await input.evaluate((node: HTMLInputElement) => node.validity.valid),
  ).toBe(false);
  await input.fill("hello@example.com");
  await page.getByRole("button", { name: "Join the newsletter" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your email has not been stored or subscribed",
  );
  await page.getByRole("button", { name: "Try another email" }).click();
  await expect(input).toHaveValue("");
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`layout, assets, navigation targets and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const failed: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failed.push(response.url());
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto("/");
    // Focusing a control hydrates the interactive island before asset inspection.
    await page.getByRole("button", { name: "Next slide", exact: true }).focus();
    await page.evaluate(async () => {
      await document.fonts.ready;
      const images = Array.from(document.images);
      for (const img of images) {
        img.loading = "eager";
      }
      await Promise.all(images.map((img) => img.decode()));
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        page.evaluate(() =>
          Array.from(document.images).every(
            (img) => img.complete && img.naturalWidth > 0,
          ),
        ),
      )
      .toBe(true);
    const typography = await page.evaluate(() => {
      const heading = document.querySelector("h1")!;
      const text = document.createRange();
      text.selectNodeContents(heading.querySelector("em")!);
      return {
        heading: getComputedStyle(heading).fontFamily,
        body: getComputedStyle(document.body).fontFamily,
        textRight: text.getBoundingClientRect().right,
        containerRight: document
          .querySelector(".hero-copy")!
          .getBoundingClientRect().right,
      };
    });
    expect(typography.heading).not.toBe(typography.body);
    expect(typography.textRight).toBeLessThanOrEqual(typography.containerRight);
    const brokenAnchors = await page
      .locator('a[href*="#"]')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => a.getAttribute("href")!.split("#")[1])
          .filter((id) => id && !document.getElementById(id)),
      );
    expect(brokenAnchors).toEqual([]);
    expect(failed).toEqual([]);
    expect(pageErrors).toEqual([]);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    if (width === 390 || width === 1440) {
      await page.screenshot({
        path: `docs/typography-hero-slider/after-${width}-top.png`,
      });
      await page.screenshot({
        path: `docs/typography-hero-slider/after-${width}.png`,
        fullPage: true,
      });
    }
  });
}

test("mobile navigation traps focus, closes, and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open navigation" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Main navigation" });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).focus();
  await page.keyboard.press("Shift+Tab");
  expect(
    await dialog.evaluate((node) => node.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await dialog.getByRole("link", { name: "Our story" }).click();
  await expect(page).toHaveURL(/#our-story$/);
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("decorative animations respect reduced motion and keyboard skip link works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  const animations = await page
    .locator(".hero-rangoli, .newsletter-pattern, .hero-image img")
    .evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).animationName),
    );
  expect(animations.every((name) => name === "none")).toBe(true);
});
