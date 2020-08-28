const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const printPdf = require("./lib/printPDF");
const input = require("./lib/input");

// const pkg = "./package.json";
// const conf = new Configstore(pkg.name);
// const files = require("./lib/files");

commander
    .command("init")
    .description("Draw app banner")
    .action(() => {
        clear();
        console.log(
            chalk.cyanBright(
                figlet.textSync("********", { horizontalLayout: "full" })
            )
        );
        console.log(
            chalk.black.bgCyanBright.bold(
                figlet.textSync("printPDF", { horizontalLayout: "full" })
            )
        );
        console.log(
            chalk.cyanBright(
                figlet.textSync("********", { horizontalLayout: "full" })
            )
        );
        const answers = async () => {
            const answers = await input.askPrintOptions();
            return answers;
        };
        console.log("Answers: ", answers);
    });
// .description("Fetch user input from command line")
// .action(async () => {
//     const answers = await input.askPrintOptions();
//     console.log("Answers: ", answers);
// });

commander
    .command("print")
    .description("print a PDF from user input from the command line")
    .action(async () => {
        const answers = await input.askPrintOptions();
        printPdf.print(answers);
    });

// const answers = await input.getUserInput;

// TODO: get input from user
// TODO: pass input to print function

// printPdf.print();

commander.parse(process.argv);
if (!commander.args.length) {
    commander.help();
}
