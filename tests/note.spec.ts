import { expect, test as base } from "@playwright/test";
import {
  DELETE_NOTE_BUTTON,
  EDITOR,
  NEW_NOTE_BUTTON,
  NOTE_LIST_ITEM,
  NOTE_TITLE_INPUT,
} from "./selectors";

/**
 * A fixture that setups a new note and does the cleanup
 * @see https://playwright.dev/docs/test-fixtures
 */
const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("/");
    const name = `Note ${Math.random().toString(36).substring(2, 5)}`;
    await page.locator(NEW_NOTE_BUTTON).click();
    await page.locator(NOTE_TITLE_INPUT).fill(name);
    await page.locator(NOTE_TITLE_INPUT).evaluate((e) => e.blur());
    await use(page);
    await page.locator(DELETE_NOTE_BUTTON(name)).click();
    await page.locator(NOTE_LIST_ITEM(name)).waitFor({ state: "detached" });
  },
});

test("Note content changes are persisted", async ({ page, context }) => {
  await page.locator(EDITOR).fill("This is a note");
  const newPage = await context.newPage();
  await newPage.goto(page.url());
  await expect(newPage.locator(EDITOR)).toHaveText("This is a note");
});

test("Collaborative changes", async ({ page, context }) => {
  const newPage = await context.newPage();
  await newPage.goto(page.url());

  await page.locator(EDITOR).type("there!");
  await newPage.locator(EDITOR).type("Hey ");

  await expect(newPage.locator(EDITOR)).toHaveText("Hey there!");
  await page.reload();
  await newPage.close();
  await expect(page.locator(EDITOR)).toHaveText("Hey there!");
});
