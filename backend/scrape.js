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
      const descElement = document.querySelector(".elfjS");
      if (!descElement) {
        console.log("Description element not found");
        return null;
      }
      return descElement.innerHTML; // Extract inner HTML content
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

scrapeLeetCodeProblem("https://leetcode.com/problems/two-sum/description/");

// module.exports = async (req, res) => {
//   const { url } = req.query;
//   if (!url) {
//     return res.status(400).json({ error: "Missing URL parameter" });
//   }

//   const description = await scrapeLeetCodeProblem(url);
//   if (!description) {
//     return res
//       .status(500)
//       .json({ error: "Failed to scrape the problem description" });
//   }

//   res.status(200).json({ description });
// };
