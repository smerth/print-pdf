const fs = require("fs");
const path = require("path");

module.exports = {
    // cwd function returns current working directory (globally, ie: where ever you call the function from)
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
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
