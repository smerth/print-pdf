const puppeteer = require("puppeteer");
const Configstore = require("configstore");
const input = require("./input");
const { makeDirectory } = require("./files");

const pkg = "./package.json";
const conf = new Configstore(pkg.name);

// async function print() {
//     // TODO: Probably need to:
//     // 1. check if pdf dir exists in directory where the module is installed
//     // 2. check it something exists already
//     // 3. delete or archive previous content (move to another folder?)
//     // 4. prefix given path with date stamp?

//     // TODO: path + name input should be used to build path for output
//     const browser = await puppeteer.launch({
//         headless: true,
//     });
//     const page = await browser.newPage();

//     // TODO: set url from command line
//     await page.goto("https://rxresume-8714e.web.app/r/hix3g8", {
//         waitUntil: "networkidle2",
//     });

//     await page.emulateMediaType("print");
//     let pdf;

//     // TODO: set type variable from command line
//     const type = "single";

//     if (type === "single") {
//         const height = await page.evaluate(() => {
//             const { body } = document;
//             const html = document.documentElement;

//             const maxHeight = Math.max(
//                 body.scrollHeight,
//                 body.offsetHeight,
//                 html.clientHeight,
//                 html.scrollHeight,
//                 html.offsetHeight
//             );

//             return maxHeight;
//         });
//         pdf = await page.pdf({
//             // TODO: set path from command line
//             path: "resume.pdf",
//             // TODO: set printBackground from command line
//             printBackground: true,
//             width: `21cm`,
//             height: `${height}px`,
//             pageRanges: "1",
//         });
//     } else {
//         pdf = await page.pdf({
//             // TODO: set path from command line
//             path: "resume.pdf",
//             format: "A4",
//             printBackground: true,
//         });
//     }

//     await browser.close();
//     return Buffer.from(pdf).toString("base64");
// }

// async  () => {
//     const answers = await input.askPrintOptions();
// console.log(answers)
// },

// module.exports.print = print;

module.exports = {
    getUserInput: async () => {
        const answers = await input.askPrintOptions();
        conf.set("answers", answers);
        return answers;
    },
    print: async ({ url, type, outputPath, outputFileName }) => {
        // options {
        //     url: 'some-url',
        //     type: 'single',
        //     outputPath: 'github/test',
        //     outputFileName: 'resume'
        //   }
        makeDirectory(outputPath);
        const path = `${outputPath}/${outputFileName}`;
        // const type = options.type;
        // TODO: use file functions to build a proper path
        // const outputPath = options.output;
        // TODO: use file functions to check if a file exists, if it does, append with date and move to archive folder
        // console.log("options", options);
        // TODO: path + name input should be used to build path for output
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        // TODO: set url from command line
        await page.goto(url, {
            waitUntil: "networkidle2",
        });

        await page.emulateMediaType("print");
        let pdf;

        // TODO: set type variable from command line

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
                // TODO: set path from command line
                path: path,
                // TODO: set printBackground from command line
                printBackground: true,
                width: `21cm`,
                height: `${height}px`,
                pageRanges: "1",
            });
        } else {
            pdf = await page.pdf({
                // TODO: set path from command line
                path: path,
                format: "A4",
                printBackground: true,
            });
        }

        await browser.close();
        return Buffer.from(pdf).toString("base64");
    },
};

// module.exports = {
// printPdf: () => {
//     return print;
// },
// };

// (async () => {
//     //   const browser = await puppeteer.launch()
//     const browser = await puppeteer.launch({
//         headless: true,
//     });
//     //   const page = await browser.newPage()
//     const page = await browser.newPage();
//     //   await page.goto("http://localhost:8000/web/work", {
//     //     waitUntil: ["load", "networkidle0", "domcontentloaded"],
//     //   })
//     //   await page.goto("http://localhost:8000/web/work")
//     await page.goto("http://localhost:8000/web/work", {
//         waitUntil: "networkidle2",
//     });

//     await page.emulateMediaType("print");
//     let pdf;

//     const type = "single";

//     if (type === "single") {
//         const height = await page.evaluate(() => {
//             const { body } = document;
//             const html = document.documentElement;

//             const maxHeight = Math.max(
//                 body.scrollHeight,
//                 body.offsetHeight,
//                 html.clientHeight,
//                 html.scrollHeight,
//                 html.offsetHeight
//             );

//             return maxHeight;
//         });
//         pdf = await page.pdf({
//             path: "resume.pdf",
//             printBackground: true,
//             width: `21cm`,
//             height: `${height}px`,
//             pageRanges: "1",
//         });
//     } else {
//         pdf = await page.pdf({
//             path: "resume.pdf",
//             format: "A4",
//             printBackground: true,
//         });
//     }

//     await browser.close();
//     return Buffer.from(pdf).toString("base64");
// })();
