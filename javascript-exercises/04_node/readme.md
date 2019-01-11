## 1_readTextFile.ts - czytanie pliku tekstowego

### a) readTextFileSync

- napisać metodę synchroniczną `readTextFileSync(filePath: string): TextFileInfo | null { ... } ` zwracają wartość `null` gdy plik nie istnieje lub `TextFileInfo` gdy plik istnieje

```javascript
interface TextFileInfo {
    name: string;
    fullPath: string;
    size: number;
    modifiedTime: Date;
    text: string;
}
```

- **uwaga**
    - skorzystać z metod: `fs.existsSync fs.statSync fs.readFileSync`
    - wywołanie `fs.readFileSync(sciezka_do_pliku, "utf-8")` wraca plik jako `string`
    - skorzystać z metody `path.basename(pelna_sciezka_do_pliku)` zwracającą nazwę pliku
    - jako test napisanej przeczytać informacje o pliku `__filename` (aktualnie wykonywany skrypt JS)




### b) readTextFileWithCallback

- napisać analogiczną metodę asynchroniczną `readTextFileWithCallback(filePath: string, callback: errback<TextFileInfo | null>) { ... }` wykorzystując callback

- **uwaga**
    - skorzystać z metod: `fs.exists fs.stat fs.readFile`
    - typ pomocniczy `errback` pochodzi z `import { errback } from "./myutils";`




### c) readTextFile

- napisać analogiczną metodę asynchroniczną `async function readTextFile(filePath: string): Promise<TextFileInfo | null> { { ... } ` wykorzystując async/await

- **uwaga**
    - w pierwszej linijce skryptu dodać `import "./promisifyPolyfill";` (dzięki temu dostępna będzie metoda `util.promisify`)
    - skorzystać z metody `util.promisify` konwertującej callbackowe API do Promise `const fs_exists = promisify(fs.exists)` lub zaimportować gotowe metody `import { fs_exists, fs_readFile, fs_stat } from "./myutils";`





## 2_copyFolder.ts - kopiowanie zawartości folderu

### a) copyFolderSync
- napisać metodę synchroniczną `function copyFolderSync(sourcePath: string, targetPath: string) { ... }` kopiującą zawartość źródłowego folderu do wskazanego docelowego folderu
- jeśli folder docelowy nie istnieje, to zostanie stworzony
- metody kopiuje także wszystkie podfoldery
- **uwaga:**
    - warto zacząć od napisania metody pomocniczej `function copyFileSync(sourcePath: string, targetPath: string) { ... } ` kopiującej jedynie wskazany plik
    - skorzystać z metod: `fs.existsSync fs.statSync fs.readFileSync fs.writeFileSync, fs.readdirSync, fs.mkdirSync`



### b) copyFolder

- napisać analogiczną metodę asynchroniczną `async function copyFolder(sourcePath: string, targetPath: string) { ... }` wykorzystując async/await
- napisać drugą wersje metody kopiującą **równocześnie** pliki/foldery

- **uwaga:**
    - warto zacząć od napisania metody pomocniczej `async function copyFile(sourcePath: string, targetPath: string) { ... } ` kopiującej jedynie wskazany plik
    - warto skorzystać z metod `import { fs_exists, fs_readFile, fs_writeFile, fs_readdir, fs_mkdir, fs_stat } from "./myutils";`
    



