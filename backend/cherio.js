const puppeteer = require("puppeteer");

async function scrapeLeetCodeProblem(url) {
  try {
    const browser = await puppeteer.launch(); // Set headless to false for debugging
    const page = await browser.newPage();

    // Capture console messages from the page
    page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Custom delay function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Wait for a longer period to ensure the page fully loads
    // await delay(5000); // Wait for an additional 5 seconds

    // Wait for the selector to be present on the page
    await page.waitForSelector(".text-title-large a", { timeout: 60000 });

    // Evaluate the page content
    const data = await page.evaluate(() => {
      console.log("Scraping data...");
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
      const description = descElement.innerText;

      console.log("Title:", title + " Description: " + description);
      return { Title: title, Description: description };
    });

    console.log("Scraped Data:", data);

    await browser.close();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// scrapeLeetCodeProblem("https://leetcode.com/problems/two-sum/description/");
