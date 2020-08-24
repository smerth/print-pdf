const inquirer = require("inquirer");
const minimist = require("minimist");
const files = require("./files");

module.exports = {
    askConfig: () => {
        const questions = [
            {
                name: "url",
                type: "input",
                message:
                    "Enter the url for the web page you want to print to pdf.",
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter the url for the web page you want to print to pdf.";
                    }
                },
            },
            {
                type: "list",
                name: "type",
                message:
                    "Enter the type of pdf output. 'single' to squash the webpage into a single pdf page. 'multiple' for a scrolling multipage pdf.",
                choices: ["Single", "Multiple"],
                filter: function (val) {
                    return val.toLowerCase();
                },
            },
            {
                name: "output",
                type: "input",
                message: "Enter the path to the directory for pdf output.",
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter the path to the directory for pdf output.";
                    }
                },
            },
        ];
        return inquirer.prompt(questions);
    },
};
