const io = {
    getDirectoryName(fullPath) {
        return require("path").basename(fullPath);
    },
    getDirectories(fullPath) {
        return require("fs")
            .readdirSync(fullPath)
            .map(d => require("path").join(fullPath, d))
            .filter(d => require("fs").statSync(d).isDirectory());
    }
};

class Folder {
    static get projectPath() {
        return "/Volumes/data/bitbucket/javascript-exercises";
    }

    constructor(fullPath) {
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

function* enumerateAllFolders(folderPath) {
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
