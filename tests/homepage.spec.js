import { test, expect } from "@playwright/test";

test("Homepage UI renders correctly", async ({ page }) => {

  await page.goto("http://localhost:5173");

  await expect(
    page.getByRole("heading", { name: /Luxury/i })
  ).toBeVisible();

  await expect(
    page.getByAltText("Luxury Fashion")
  ).toBeVisible();

  await expect(
    page.getByTestId("shop-now-btn")
  ).toBeVisible();

  await expect(
    page.getByTestId("featured-products-heading")
  ).toBeVisible();

});