

## es6.js - usprawnić kod z ćwiczenia `es5.js` dodając elementy ES6

- uwagi:
    - w kodzie ćwiczenia korzystać z `let` lub `const` zamiast `var`
    - ćwiczenie uruchamiać poleceniem `node nazwa_skryptu.js` lub debugując bezpośrednio z VS Code
- klasa `Folder` 
    - przekopiować implementację klasy `Folder` oraz obiektu pomocniczego `io`
    - przy definicji obiektu `io` skorzystać z "object literal extensions"
    - zamienić implementację klasy `Folder` na składnię ES6 `class Folder { ... }`
    - w metodzie `toString` skorzystać z "template literals"
    - w kodzie klasy korzystać z "arrow functions"
    - uwzlędnić statyczną właściwość `projectPath`
- napisać funkcję `function* enumerateAllFolders(folderPath) { ... }` będącą generatorem ścieżek do wszystkich podfolderów wskazanego folderu
    - wykorzystać implementację klasy `Folder`
    - dla przykładowej struktury folderów

```
/A
    /B
        /C
        /D
    /E
```
wywołanie 

```javascript
for (const item of enumerateAllFolders("/A")) {
    console.log(item);
}
```

powinno wypisać

```
/A
/A/B
/A/B/C
/A/B/D
/A/E
```

## napisać przykładowy kod korzystająćy z spread/rest operatora oraz destructuring
