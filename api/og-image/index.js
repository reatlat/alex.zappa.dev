// Open Graph Image Generator

const chromium = require("chrome-aws-lambda");

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

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: { height: 630, width: 1200 },
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    const websiteUrl = rawUrl.split(path)[0] + atob(url);

    await page.goto(websiteUrl, { waitUntil: "networkidle0" });

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
