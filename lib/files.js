const fs = require("fs");
const path = require("path");

module.exports = {
    // cwd function returns current working directory (globally, ie: where ever you call the function from)
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    directoryExists: (filePath) => {
        try {
            return fs.stat.sync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },
};
