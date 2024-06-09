const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

async function scrapeLeetCodeProblem(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Custom delay function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000); // Wait for an additional 5 seconds

    // Wait for the element containing the description to be present
    await page.waitForSelector(".elfjS", { timeout: 60000 });

    // Evaluate the page content to extract the description
    const description = await page.evaluate(() => {
      const titleElement = document.querySelector(".text-title-large a");
      if (!titleElement) {
        console.log("Title element not found");
        return null;
      }
      const title = titleElement.innerText;

      const descElement = document.querySelector(".elfjS");
      if (!descElement) {
        console.log("Description element not found");
        return null;
      }
      const description = descElement.innerHTML; // Extract inner HTML content

      return { Title: title, Description: description };
    });

    console.log("Scraped Description:", description);

    return description;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { scrapeLeetCodeProblem };
