const inquirer = require("inquirer");
const minimist = require("minimist");
const files = require("./files");

module.exports = {
    askPrintOptions: () => {
        const questions = [
            {
                name: "url",
                type: "input",
                message:
                    "Enter the url for the web page you want to print to pdf:",
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter the url for the web page you want to print to pdf:";
                    }
                },
            },
            {
                type: "list",
                name: "type",
                message:
                    "Enter the type of pdf output. 'single' to squash the webpage into a single pdf page. 'multiple' for a scrolling multipage pdf:",
                choices: ["Single", "Multiple"],
                filter: function (val) {
                    return val.toLowerCase();
                },
            },
            {
                name: "outputPath",
                type: "input",
                message:
                    "Enter the path to the directory for pdf output, no forward or trailing slash:",
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter the path to the directory for pdf output:";
                    }
                },
            },
            {
                name: "outputFileName",
                type: "input",
                message: "Enter the file name for the generated PDF file: ",
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter the file name for the generated PDF file:";
                    }
                },
            },
        ];
        return inquirer.prompt(questions);
    },
};
