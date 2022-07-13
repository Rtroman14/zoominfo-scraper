require("dotenv").config();

const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const _ = require("./src/Helpers");
const ZoomInfo = require("./src/ZoomInfo");
const writeJson = require("./src/writeJson");

const FILE_NAME = "Test";
const ZOOM_INFO =
    "https://app.zoominfo.com/#/apps/search/v2/results/person?query=eyJmaWx0ZXJzIjp7InBhc3RQb3NpdGlvbiI6W3siZCI6IkN1cnJlbnQgQ29tcGFueSIsInYiOiIxIn1dLCJpc0NlcnRpZmllZCI6W3siZCI6IkluY2x1ZGUgTm9uLUNlcnRpZmllZCBDb21wYW5pZXMiLCJ2IjpmYWxzZX1dLCJzb3J0UGVvcGxlIjpbeyJkIjoiUmVsZXZhbmNlIiwidiI6IlJlbGV2YW5jZSIsImlzRGVmU3J0Ijp0cnVlfV0sInNvcnRQZW9wbGVPcmRlciI6W3siZCI6IiIsInYiOiJkZXNjIn1dLCJzb3J0Q29tcGFueSI6W3siZCI6IlJlbGV2YW5jZSIsInYiOiIiLCJpc0RlZlNydCI6dHJ1ZX1dLCJzb3J0Q29tcGFueU9yZGVyIjpbeyJkIjoiIiwidiI6ImRlc2MifV0sInNvcnRTY29vcCI6W3siZCI6IiIsInYiOiIiLCJpc0RlZlNydCI6dHJ1ZX1dLCJzb3J0U2Nvb3BPcmRlciI6W3siZCI6IiIsInYiOiJkZXNjIn1dLCJib2FyZE1lbWJlcnMiOlt7ImQiOiJFeGNsdWRlIEJvYXJkIE1lbWJlcnMiLCJ2IjowfV0sInBhcnRpYWxQcm9maWxlcyI6W3siZCI6IkV4Y2x1ZGUgUGFydGlhbCBQcm9maWxlcyIsInYiOnRydWV9XSwiZXhjbHVkZURlZnVuY3RDb21wYW5pZXMiOlt7ImQiOiJFeGNsdWRlIERlZnVuY3QgQ29tcGFuaWVzIiwidiI6dHJ1ZX1dLCJuZWdhdGlvbiI6W3siZCI6IiIsInYiOmZhbHNlfV0sImNvbnRhY3RJbmZvIjpbeyJkIjoiQW55IEluZm8iLCJ2IjoiIn1dLCJleGNsdWRlRXhwb3J0ZWRDb250YWN0cyI6W3siZCI6IiIsInYiOmZhbHNlfV0sImV4Y2x1ZGVFeHBvcnRlZENvbXBhbmllcyI6W3siZCI6IiIsInYiOmZhbHNlfV0sImV4Y2x1ZGVJbXBvcnRlZENvbXBhbmllcyI6W3siZCI6IiIsInYiOmZhbHNlfV0sImV4Y2x1ZGVJbXBvcnRlZENvbnRhY3RzIjpbeyJkIjoiIiwidiI6ZmFsc2V9XSwiY29uZmlkZW5jZVJhbmdlIjpbeyJkIjoiODUtOTkiLCJ2IjpbODUsOTldfV0sIm91dHB1dEN1cnJlbmN5Q29kZSI6W3siZCI6IiIsInYiOiJVU0QifV0sImlucHV0Q3VycmVuY3lDb2RlIjpbeyJkIjoiIiwidiI6IlVTRCJ9XSwiam9iVGl0bGUiOlt7ImQiOiJcImZhY2lsaXRpZXNcIiIsInYiOiJcImZhY2lsaXRpZXNcIiJ9XSwiaGFzTW9iaWxlUGhvbmUiOlt7ImQiOiJNb2JpbGUgUGhvbmUiLCJ2IjoiaW5jbHVkZSJ9XSwiaGFzUGVyc29uYWxFbWFpbCI6W3siZCI6IlN1cHBsZW1lbnRhbCBFbWFpbCIsInYiOiJpbmNsdWRlIn1dLCJoYXNFbWFpbCI6W3siZCI6IkJ1c2luZXNzIEVtYWlsIiwidiI6ImluY2x1ZGUifV0sIm1ldHJvUmVnaW9uIjpbeyJkIjoiRkwgLSBPcmxhbmRvIiwidiI6IkZMIC0gT3JsYW5kbyJ9XX0sInNlYXJjaFR5cGUiOjAsImljcFN0YXR1cyI6ZmFsc2UsImRlZmF1bHRJY3BQcm9maWxlIjpudWxsLCJza2lwSGlzdG9yeSI6ZmFsc2UsInBhZ2UiOjF9";

let allProspects = [];

(async () => {
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setViewport({ width: 1366, height: 768 });

        // robot detection incognito - console.log(navigator.userAgent);
        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        );

        const cookiesString = await fs.readFile("./cookies.json");
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);

        let headers = false;
        let body = false;

        await page.setRequestInterception(true);
        page.on("request", (request) => {
            const requestUrl = request.url();

            if (requestUrl === "https://app.zoominfo.com/anura/zoominfo/hPeopleSearch") {
                headers = request.headers();
                body = request.postData();
            }

            request.continue();
        });

        await page.goto(ZOOM_INFO, { waitUntil: "networkidle2" });
        await page.waitForTimeout(15000);
        console.log("loaded");

        if (headers && body) {
            const { maxResults, totalResults } = await ZoomInfo.hPeopleSearch(headers, body);

            const pages = Math.ceil(maxResults / totalResults);

            for (let page = 1; page <= pages; page++) {
                let postBody = {
                    ...JSON.parse(body),
                    page,
                };

                const { data: persons } = await ZoomInfo.hPeopleSearch(
                    headers,
                    JSON.stringify(postBody)
                );

                const personIds = persons.map((person) => ({ personId: person.personID }));

                let { data: prospects } = await ZoomInfo.viewContacts(
                    headers,
                    JSON.stringify(personIds)
                );

                prospects = prospects.map((prospect) => _.formatContact(prospect));

                allProspects = [...allProspects, ...prospects];
            }
        }

        writeJson(allProspects, FILE_NAME);

        // // close browser
        await browser.close();
        console.log("Browser closed");
    } catch (error) {
        // close browser
        await browser.close();
        console.log("Browser closed");

        writeJson(allProspects, FILE_NAME);

        console.log(`ERROR --- reonomy() --- ${error}`);
    }
})();
