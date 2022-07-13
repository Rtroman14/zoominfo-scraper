require("dotenv").config();

const puppeteer = require("puppeteer");

// const scrapeProperty = require("./src/scrapeProperty");
const writeJson = require("./src/writeJson");

const FILE_NAME = "Tectum - sa";
const ZOOM_INFO = "https://app.zoominfo.com/#/apps/home-page";

(async () => {
    let browser;
    let allProspects = [];
    let pages = 1;
    let morePages = true;
    let pageNumber = 1;
    let time;
    let nextUrl;
    let nextPage = 2;

    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setViewport({ width: 1366, height: 768 });

        // robot detection incognito - console.log(navigator.userAgent);
        page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        );

        await page.goto(ZOOM_INFO, { waitUntil: "networkidle2" });
        console.log("login loaded");

        // login
        await page.waitForSelector("#okta-signin-username", { visible: true });
        await page.type("#okta-signin-username", process.env.USERNAME, { delay: 100 }); // Types slower, like a user
        await page.type("#okta-signin-password", process.env.PASSWORD, { delay: 100 }); // Types slower, like a user
        await page.click("#okta-signin-submit");
        // await page.waitForNavigation({ waitUntil: "load" });
        console.log("Logged in");

        await page.waitForTimeout(15000);
        console.log("done waiting");

        await page.goto(ZOOM_INFO, { waitUntil: "networkidle2" });
        console.log("navigated");

        await page.waitForTimeout(3000);

        const cookies = await page.cookies();
        console.log("pulled cookies");
        writeJson(cookies, "cookies");

        // close browser
        await browser.close();
        console.log("Browser closed");
    } catch (error) {
        // close browser
        await browser.close();
        console.log("Browser closed");

        console.log(`ERROR --- reonomy() --- ${error}`);
    }
})();
