import * as fs from "fs";
import * as path from "path";

export interface File {
    name: string;
    fullPath: string;
    size: number;
}

export function* enumerableAllFiles(folderPath: string): Iterable<File> {
    const filesAndFoldersNames = fs.readdirSync(folderPath);

    for (const ffName of filesAndFoldersNames) {
        const fullPath = path.join(folderPath, ffName);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            yield* enumerableAllFiles(fullPath);
        } else {
            yield <File>{
                name: ffName,
                fullPath,
                size: stat.size
            };
        }
    }
}
