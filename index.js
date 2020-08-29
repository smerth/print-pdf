const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const { print } = require("./lib/printPDF");
const { getCurrentDirectoryBase, makeDirectory } = require("./lib/files");
const input = require("./lib/input");

module.exports = {
    print,
    getCurrentDirectoryBase,
    makeDirectory,
};

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
    });

commander
    .command("print")
    .description("print a PDF from user input from the command line")
    .action(async () => {
        const answers = await input.askPrintOptions();
        print(answers);
    });

commander.parse(process.argv);
if (!commander.args.length) {
    commander.help();
}
