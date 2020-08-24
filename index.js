const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const printPdf = require("./lib/printPDF");
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
    });

commander.parse(process.argv);
if (!commander.args.length) {
    commander.help();
}

// TODO: get input from user
// TODO: pass input to print function

printPdf.print();
