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
    fileExists: (filePath) => {
        try {
            return fs.existsSync(filePath);
            //file exists
        } catch (err) {
            console.error(err);
        }
    },
    fileExistsAsync: (filePath) => {
        return fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                throw err;
            }
            // file exists
        });
    },
    makeDirectory: (dir) => {
        if (fs.existsSync(dir)) {
            console.log("directory exists");
        } else {
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }

                console.log("directory created");
            });
        }
    },
};
