import "./promisifyPolyfill";
import * as fs from "fs";
import * as path from "path";
import { errback } from "./myutils";
import { fs_exists, fs_readFile, fs_stat } from "./myutils";

// wywolanie synchroniczne
// try {
//     const fileInfo = readTextFileSync(__filename);
//     console.log(fileInfo);
// } catch (error) {
//     console.error("error", error);
// }

// wywolanie asynchroniczne z callbackiem
// readTextFileWithCallback(__filename, function (err, fileInfo) {
//     if (err) {
//         console.error("error", err);
//     } else {
//         console.log(fileInfo);
//     }
// });

// wywolanie asynchroniczne z async/await
// (async function () {
//     try {
//         const fileInfo = await readTextFile(__filename);
//         console.log(fileInfo);
//     } catch (error) {
//         console.error("error", error);
//     }
// })();


// --------------------------------------------------------------------------------------------------

interface TextFileInfo {
    name: string;
    fullPath: string;
    size: number;
    modifiedTime: Date;
    text: string;
}

function readTextFileSync(filePath: string): TextFileInfo | null {
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const stat = fs.statSync(filePath);
    const text = fs.readFileSync(filePath, "utf-8");

    return {
        name: path.basename(filePath),
        fullPath: filePath,
        modifiedTime: stat.mtime,
        size: stat.size,
        text: text
    };
}


function readTextFileWithCallback(filePath: string, callback: errback<TextFileInfo | null>) {
    fs.exists(filePath, function (exists) {
        if (!exists) { return callback(null, null); }

        fs.stat(filePath, function (err, stat) {
            if (err) { return callback(err); }

            fs.readFile(filePath, "utf-8", function (err, text) {
                if (err) { return callback(err); }

                callback(null, {
                    name: path.basename(filePath),
                    fullPath: filePath,
                    modifiedTime: stat.mtime,
                    size: stat.size,
                    text: text
                });
            });
        });
    });
}


async function readTextFile(filePath: string): Promise<TextFileInfo | null> {
    if (! await fs_exists(filePath)) {
        return null;
    }

    const stat = await fs_stat(filePath);
    const text = await fs_readFile(filePath, "utf-8");

    return {
        name: path.basename(filePath),
        fullPath: filePath,
        modifiedTime: stat.mtime,
        size: stat.size,
        text: text
    };
}