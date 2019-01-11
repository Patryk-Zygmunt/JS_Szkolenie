

// - napisac funkcje `add(a, b)` ktora dodaje do siebie przekazane argumenty
// - przetestowac jej dzialanie dla: `add(10,20), add("abc","xyz"), add(5, "a")`
function add(a, b) {
    return a + b;
}
console.log(add(10, 20), add("abc", "xyz"), add(5, "a"));




// - napisac funkcje `maxItem(items)` zwracajaca maksymalny element w tablicy
// - jesli tablica jest pusta, ma wartosc null lub undefined, metoda zwraca undefined 
function maxItem(items) {
    if (items === null || items === undefined || items.length === 0) {
        return undefined;
    }

    var maxItem = items[0];
    for (var i = 1; i < items.length; i++) {
        var currentItem = items[i];
        if (currentItem > maxItem) {
            maxItem = currentItem;
        }
    }

    return maxItem;
}

console.log(maxItem(null), maxItem(undefined), maxItem([]));
console.log(maxItem([3, 5, 1]), maxItem(["c", "x", "a"]));




// - napisac funkcje `maxItemWithComparer(items, comparer)` dzialajaca analicznie do poprzedniej funkcji `maxItem`
// - `comparer` jest funkcja porownujaca 2 elementy tablicy, zwraca liczbe dodatnia gdy pierwsza jest wieksza,
//  ujemna gdy druga jest wieksza, zero gdy sa takie same
// - przykladowe wywolanie `maxItemWithComparer([3,4,5,2,1], function(a,b){ return a - b; })
function maxItemWithComparer(items, comparer) {
    if (items === null || items === undefined || items.length === 0) {
        return undefined;
    }

    var maxItem = items[0];
    for (var i = 1; i < items.length; i++) {
        var currentItem = items[i];
        if (comparer(currentItem, maxItem) > 0) {
            maxItem = currentItem;
        }
    }

    return maxItem;
}

function maxNumber(n1, n2) {
    return n1 - n2;
}

console.log(maxItemWithComparer([3, 4, 5, 2, 1], maxNumber));
console.log(maxItemWithComparer(["aa", "aaaaa", "a"], function (s1, s2) {
    return s1.length - s2.length;
}));




// - napisac funkcje `generateRandomNumbers(count)` tworzaca tablice `count` liczb losowych calkowitych z przedzialu 0..100
// - skorzystac z funkcji `Math.randon()` i `Math.floor`
function generateRandomNumbers(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push(Math.ceil(Math.random() * 100));
    }
    return result;
}

console.log(generateRandomNumbers(10));




// - wygeneruj 20 liczby losowych za pomoca metody `generateRandomNumbers(20)`
// - nastepnie znajdz te ktore sa parzyste
// - nastepnie dla kazdej liczby stworz obiekt punkt `{x:liczba, y: liczba*10}`
// - nastepnie wypisz je na ekran numerujac w formacie "0. X=10 Y=12"
// - skorzystac z metod tablicy: `filter, map, forEach`
generateRandomNumbers(20).filter(function (n) {
    return n % 2 == 0;
}).map(function (n) {
    return { x: n, y: n * 10 };
}).forEach(function (n, index) {
    console.log(index + ". X=" + n.x + " Y=" + n.y);
});





// - napisac metode `countByLength(strings)` zliczajaca liczbe wystapien napisow o okreslonej dlugosci
// - przykladowe wywolanie `countByLength(["a", "ba", "ccc", "p", "ttttt"])` zwroci obiekt 
// `{ '1': 2, '2': 1, '3': 1, '5': 1 }`
function countByLength(strings) {
    var obj = {};

    strings.forEach(function (s) {
        if (s.length in obj) {
            obj[s.length]++; ``
        } else {
            obj[s.length] = 1;
        }
    });

    return obj;
}

console.log(countByLength(["a", "ba", "ccc", "p", "ttttt"]));



// - dostarczony obiekt pomocniczy `io` posiada metode `getDirectoryName` zwracajaca nazwe folderu dla podanej sciezki,
// oraz metode `getDirectories` zwracajaca sciezki dla wszystkich podfolderow podanego folderu
// - napisac konstruktor `Folder(fullPath)` tworzacy obiekt typu Folder
// - konstruktor ustawia wlasciwosc `fullPath`, ustawia wlasciwosc `name` przechowujaca nazwe folderu oraz 
// inicjuje wlasciwosc `folders` pusta tablica
// - dodac metode instancyjna `loadFolders()` ustawiajaca wlasciwosc `folders` wartoscia tablicy 
// zawierajacej obiekty typu `Folder` dla wszystkich podfolderow 
// - dodac metode instancyjna `toString()` zwracajaca napis w formacie "nazwa_folderu (nazwa_podfolderu1,nazwa_podfolderu2,...)"
// - dodac wlasciwosc statyczna `projectFolder` zawieraca sciezke do folderu zawierajace projekt z cwiczeniami
// - napisac kod testujace dzialanie napisanej klasy

var io = {
    getDirectoryName: function (fullPath) {
        return require("path").basename(fullPath);
    },
    getDirectories: function (fullPath) {
        return require("fs")
            .readdirSync(fullPath)
            .map(function (d) {
                return require("path").join(fullPath, d);
            })
            .filter(function (d) {
                return require("fs").statSync(d).isDirectory();
            });
    }
};


function Folder(fullPath) {
    this.fullPath = fullPath;
    this.name = io.getDirectoryName(fullPath);
    this.folders = [];
}
Folder.prototype.loadFolders = function () {
    this.folders = io
        .getDirectories(this.fullPath)
        .map(function (f) {
            return new Folder(f);
        });
};
Folder.prototype.toString = function () {
    var directoryNames = this.folders
        .map(function (d) {
            return d.name;
        })
        .join(",");
    return this.name + " (" + directoryNames + ")";
}
Folder.projectPath = "/Volumes/data/bitbucket/javascript-exercises";


var projectFolder = new Folder(Folder.projectPath);
console.log(projectFolder.toString());
projectFolder.loadFolders();
console.log(projectFolder.toString());
