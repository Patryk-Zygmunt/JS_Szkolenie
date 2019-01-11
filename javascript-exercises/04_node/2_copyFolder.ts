import "./promisifyPolyfill";
import * as fs from "fs";
import * as path from "path";
import { errback } from "./myutils";
import { fs_exists, fs_readFile, fs_writeFile, fs_readdir, fs_mkdir, fs_stat } from "./myutils";



const fullSourcePath = path.join(__dirname);
const targetFolderPath = path.join(fullSourcePath, "..", "_temp");
console.log(`kopiuje '${fullSourcePath}' -->  '${targetFolderPath}'`);

// copyFolderSync(fullSourcePath, targetFolderPath);
// copyFolder(fullSourcePath, targetFolderPath).then(_ => console.log("koniec"), console.error);


// ----------------------------------------------------------------------------------------
// implementacja synchroniczna

function copyFolderSync(sourcePath: string, targetPath: string) {
    if (!fs.existsSync(sourcePath)) {
        return;
    }

    // stworz folder docelowy jesli nie istnieje
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }

    // pobierz liste plikow i folderow
    const fdNames = fs.readdirSync(sourcePath);

    // skopiuj pliki oraz foldery
    for (const fdName of fdNames) {
        const fullPath = path.join(sourcePath, fdName);
        if (!fs.statSync(fullPath).isDirectory()) {
            copyFileSync(fullPath, path.join(targetPath, fdName));
        } else {
            copyFolderSync(fullPath, path.join(targetPath, fdName));
        }
    }
}

function copyFileSync(sourcePath: string, targetPath: string) {
    const data = fs.readFileSync(sourcePath);
    fs.writeFileSync(targetPath, data);
}

// ----------------------------------------------------------------------------------------
// implementacja asynchroniczna za pomoca async/await


async function copyFolder(sourcePath: string, targetPath: string) {
    if (! await fs_exists(sourcePath)) {
        return;
    }

    // stworz folder docelowy jesli nie istnieje
    if (! await fs_exists(targetPath)) {
        await fs_mkdir(targetPath);
    }

    // pobierz liste plikow i folderow
    const fdNames = await fs_readdir(sourcePath);

    // skopiuj pliki oraz foldery (sekwencyjnie)
    for (const fdName of fdNames) {
        const fullPath = path.join(sourcePath, fdName);
        if (!(await fs_stat(fullPath)).isDirectory()) {
            await copyFile(fullPath, path.join(targetPath, fdName));
        } else {
            await copyFolder(fullPath, path.join(targetPath, fdName));
        }
    }

    // alternatywna implementacja, skopiuj pliki oraz foldery (rownoczesnie)
    // async function copy(fdName: string) {
    //     const fullPath = path.join(sourcePath, fdName);
    //     if (!(await fs_stat(fullPath)).isDirectory()) {
    //         await copyFile(fullPath, path.join(targetPath, fdName));
    //     } else {
    //         await copyFolder(fullPath, path.join(targetPath, fdName));
    //     }
    // }
    // await Promise.all(fdNames.map(copy));
}


async function copyFile(sourcePath: string, targetPath: string) {
    const data = await fs_readFile(sourcePath);
    await fs_writeFile(targetPath, data);
}
