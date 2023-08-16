// Open Graph Image Generator

const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {
    const { rawUrl, path, httpMethod } = event;

    if (httpMethod !== "GET")
        return {
            statusCode: 405,
            body: JSON.stringify({
                status: "error",
                message: `${httpMethod} method not allowed. Use GET.`,
            }),
        };

    const { url } = event.queryStringParameters;

    if (!url)
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: "error",
                message: `Missing required parameter: url`,
            }),
        };

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { height: 630, width: 1200 },
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setJavaScriptEnabled(false);

    const websiteUrl = rawUrl.split(path)[0] + atob(url);

    // go to page and wait 1second for page to load
    await page.goto(websiteUrl, { timeout: 1000 });

    const buffer = await page.screenshot();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "image/png",
        },
        body: buffer.toString("base64"),
        isBase64Encoded: true,
    };
};
