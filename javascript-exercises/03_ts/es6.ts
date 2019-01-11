import * as fs from "fs";
import * as path from "path";

const io = {
    getDirectoryName(fullPath: string) {
        return path.basename(fullPath);
    },
    getDirectories(fullPath: string) {
        return fs
            .readdirSync(fullPath)
            .map(d => path.join(fullPath, d))
            .filter(d => fs.statSync(d).isDirectory());
    }
};

class Folder {
    static get projectPath() {
        return "/Volumes/data/bitbucket/javascript-exercises";
    }

    name: string;
    folders: Folder[];

    constructor(public fullPath: string) {
        this.fullPath = fullPath;
        this.name = io.getDirectoryName(fullPath);
        this.folders = [];
    }

    loadFolders() {
        this.folders = io.getDirectories(this.fullPath).map(f => new Folder(f));
    }

    toString() {
        const directoryNames = this.folders.map(d => d.name).join(",");
        return `${this.name} (${directoryNames})`;
    }
}



const projectFolder = new Folder(Folder.projectPath);
console.log(projectFolder.toString());
projectFolder.loadFolders();
console.log(projectFolder.toString());

function* enumerateAllFolders(folderPath: string): Iterable<string> {
    yield folderPath;

    const folder = new Folder(folderPath);
    folder.loadFolders();

    for (const subfolder of folder.folders) {
        yield* enumerateAllFolders(subfolder.fullPath);
    }
}

for (const item of enumerateAllFolders(Folder.projectPath)) {
    console.log(item);
}
