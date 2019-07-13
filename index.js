const puppeteer = require("puppeteer");
const structure = require("./structure.json");
const fs = require("fs-extra");

const dir = "pdfs";
fs.emptyDirSync(dir);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const { base, pages } = structure;

  for (let index = 0; index < pages.length; index++) {
    const url = pages[index];
    await page.goto(`${base}${url}`);
    await page.emulateMedia("screen");
    await page.pdf({ path: `${dir}/${index}.pdf`, format: "A4" });
  }

  browser.close();
})();
