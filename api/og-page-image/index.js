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

    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: { height: 630, width: 1200 },
            executablePath:
                process.env.CHROME_EXECUTABLE_PATH ||
                (await chromium.executablePath(
                    "/var/task/node_modules/@sparticuz/chromium/bin"
                )),
        });

        const page = await browser.newPage();

        const websiteUrl = rawUrl.split(path)[0] + atob(url);

        // go to page and wait 1second for page to load
        await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });

        const buffer = await page.screenshot();

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "image/png",
            },
            body: buffer.toString("base64"),
            isBase64Encoded: true,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                status: "error",
                message: error.message,
            }),
        };
    }
};
