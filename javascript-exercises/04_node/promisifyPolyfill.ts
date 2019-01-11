require("util.promisify/shim")();    // dodaje brakujaca metode promisify do modulu wbudowanego util
import * as fs from "fs";
import { promisify } from "util";

// musimy dostarczyc wlasna implementacje metody exists poniewaz:
// https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
// Note that the parameter to this callback is not consistent with other Node.js callbacks. 
// Normally, the first parameter to a Node.js callback is an err parameter, optionally followed by other parameters. 
// The fs.exists() callback has only one boolean parameter.
(fs.exists as any)[promisify.custom] = function (path: fs.PathLike) {
    return new Promise<boolean>(function (resolve, reject) {
        fs.exists(path, resolve);
    });
};
