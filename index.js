const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const files = require("./lib/files");

commander
    .command("init")
    .description("Draw app banner")
    .action(() => {
        clear();
        console.log(
            chalk.magenta(
                figlet.textSync("printPDF", { horizontalLayout: full })
            )
        );
    });

commander.parse(process.argv);
if (!commander.args.length) {
    commander.help();
}
