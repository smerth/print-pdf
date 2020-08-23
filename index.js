const puppeteer = require("puppeteer");

(async () => {
    //   const browser = await puppeteer.launch()
    const browser = await puppeteer.launch({
        headless: true,
    });
    //   const page = await browser.newPage()
    const page = await browser.newPage();
    //   await page.goto("http://localhost:8000/web/work", {
    //     waitUntil: ["load", "networkidle0", "domcontentloaded"],
    //   })
    //   await page.goto("http://localhost:8000/web/work")
    await page.goto("http://localhost:8000/web/work", {
        waitUntil: "networkidle2",
    });

    await page.emulateMediaType("print");
    let pdf;

    const type = "single";

    if (type === "single") {
        const height = await page.evaluate(() => {
            const { body } = document;
            const html = document.documentElement;

            const maxHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );

            return maxHeight;
        });
        pdf = await page.pdf({
            path: "resume.pdf",
            printBackground: true,
            width: `21cm`,
            height: `${height}px`,
            pageRanges: "1",
        });
    } else {
        pdf = await page.pdf({
            path: "resume.pdf",
            format: "A4",
            printBackground: true,
        });
    }

    await browser.close();
    return Buffer.from(pdf).toString("base64");
})();
