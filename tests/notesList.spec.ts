import { expect, test } from "@playwright/test";
import {
  DELETE_NOTE_BUTTON,
  getNoteName,
  NEW_NOTE_BUTTON,
  NOTE_LIST_ITEM,
  NOTE_TITLE_INPUT,
} from "./selectors";

test("Note list items are created/updated/deleted", async ({ page }) => {
  const name = getNoteName();
  await page.goto("/");

  await page.locator(NEW_NOTE_BUTTON).click();
  await page.locator(NOTE_TITLE_INPUT).fill(name);
  await page.locator(NOTE_TITLE_INPUT).evaluate((e) => e.blur());
  await expect(page.locator(NOTE_LIST_ITEM(name))).toBeVisible();

  await page.reload();
  await expect(page.locator(NOTE_LIST_ITEM(name))).toBeVisible();
  await page.locator(DELETE_NOTE_BUTTON(name)).click();
  await expect(page.locator(NOTE_LIST_ITEM(name))).not.toBeVisible();
});
