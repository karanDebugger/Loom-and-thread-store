import { test, expect } from "@playwright/test";

test("Homepage UI renders correctly", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Hero Heading
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Luxury Redefined.",
    })
  ).toBeVisible();

  // Hero Image
  await expect(
    page.getByAltText("Luxury Fashion")
  ).toBeVisible();

  // Shop Now Button
  await expect(
    page.getByTestId("shop-now-btn")
  ).toBeVisible();

  // Featured Products Heading
  await expect(
    page.getByTestId("featured-products-heading")
  ).toBeVisible();
});