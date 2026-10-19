import { withBrowser, cell, mockApi, gotoBrowse, cardMenu } from "./lib.mjs";
await withBrowser(async (b) => {
  await cell(b, {}, async (page) => {
    const log = await mockApi(page);
    await gotoBrowse(page);
    console.log("articles", await page.getByRole("article").count());
    await cardMenu(page, 1);
    console.log("menu1", await page.getByRole("menuitem").allInnerTexts());
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
    await cardMenu(page, 2);
    console.log("menu2", await page.getByRole("menuitem").allInnerTexts());
    console.log(log.slice(0, 6));
  });
});
