import * as path from "path";
import { enumerableAllFiles } from "./files";
import { Enumerable } from "powerseq";

const distFolder = path.join(__dirname, "..");
const distFiles = enumerableAllFiles(distFolder);

// for (const file of distFiles) {
//     console.log(file.name);
// }

const top10JsFiles = Enumerable
    .from(distFiles)
    .filter(f => f.name.endsWith(".js"))
    .orderbydescending(f => f.size)
    .take(10)
    .toarray();

for (const file of top10JsFiles) {
    console.log(`${file.size} - ${file.name}`);
}

