## es6.ts - przepisać kod `es6.js` na TypeScript

- skopiować plik `es6.js` oraz zmienić rozszerzenie pliku na `es6.ts`
- uruchomić kompilator TypeScript w trybie nasłuchiwania zmian w plikach wywołując komendę `npm run tsc-watch`
- przenieść wywołania metod `require("fs")` oraz `require("path")` na góre pliku jako `import * as fs from "fs";` oraz  `import * as path from "path";`
- dopisać brakujące adnotację typów
- dopisać deklarację właściwości klasy `Folder` aby kod TypeScript kompilował się bez błędów
- uruchomić skrypt wywołując `node dist/03_ts/es6.js` lub debugując bezpośrednio z VS Code

## files.ts - definicja interfejsu, generatory, modułowość, biblioteka powerseq

- plik `files.ts`
    - zdefiniować interfejs `File` zawierający właściwości `name` i `fullPath` typu `string` oraz właściwość `size` typu `number`
    - napisać funkcję `function* enumerableAllFiles(folderPath: string): Iterable<File> { .. }` będącą generatorem informacji o plikach znajdujących się we wskazanym folderze oraz wszystkich podfolderach
        - wzorować się na implementacji obiektu pomocniczego `io` (skorzystać z modułów `fs` oraz `path`)
    - wyeksportować z modułu metodę oraz interfejs    
- plik `filesTest.ts`
    - skrypt ten będzie testował działanie metody zdefiniowanej w `files.ts`, będzie importował metodę `enumerableAllFiles`
    - zaimportować bibliotekę powerseq `import { Enumerable } from "powerseq";`
    - korzystając z biblioteki powerseq napisać zapytanie zwracające informacje o 10 największych plikach z roszerzeniem `*.js` znajdujących się w folderze `./dist`
    - uruchomić skrypt wywołując `node dist/03_ts/filesTest.js` lub debugując bezpośrednio z VS Code