

// - napisac funkcje `add(a, b)` ktora dodaje do siebie przekazane argumenty
// - przetestowac jej dzialanie dla: `add(10,20), add("abc","xyz"), add(5, "a")`

function add(a,b){
    if(typeof a != 'number' || typeof b != 'number'){
    throw Error("Dodawanie wartośći nieliczbowych")
    }
    return a +b;
}


// - napisac funkcje `maxItem(items)` zwracajaca maksymalny element w tablicy
// - jesli tablica jest pusta, ma wartosc null lub undefined, metoda zwraca undefined 
function maxItems(arr){
    arr = arr || [];
    var max = arr[0];
    arr.forEach(element => {
      if(element>max)
      max = element;  
    })
    return max;
}

// - napisac funkcje `maxItemWithComparer(items, comparer)` dzialajaca analicznie do poprzedniej funkcji `maxItem`
// - `comparer` jest funkcja porownujaca 2 elementy tablicy, zwraca liczbe dodatnia gdy pierwsza jest wieksza,
//  ujemna gdy druga jest wieksza, zero gdy sa takie same
// - przykladowe wywolanie `maxItemCom([3,4,5,2,1], function(a,b){ return a - b; })
function maxItemsCom(arr,fun){
    arr = arr || [];
    var max = arr[0];
    arr.forEach(element => {
      if(fun(element,max)>0)
      max = element;  
    })
    return max;
}



// - napisac funkcje `generateRandomNumbers(count)` tworzaca tablice `count` liczb losowych calkowitych z przedzialu 0..100
// - skorzystac z funkcji `Math.randon()` i `Math.floor`

function gRandom(){
    var arr=[];
    for(var i =0; i< 10; i++){
        arr.push(Math.floor(Math.random()*100))
    }
    return arr;
}




// - wygeneruj 20 liczby losowych za pomoca metody `generateRandomNumbers(20)`
// - nastepnie znajdz te ktore sa parzyste
// - nastepnie dla kazdej liczby stworz obiekt punkt `{x:liczba, y: liczba*10}`
// - nastepnie wypisz je na ekran numerujac w formacie "0. X=10 Y=12"
// - skorzystac z metod tablicy: `filter, map, forEach`





// - napisac metode `countByLength(strings)` zliczajaca liczbe wystapien napisow o okreslonej dlugosci
// - przykladowe wywolanie `countByLength(["a", "ba", "ccc", "p", "ttttt"])` zwroci obiekt 
// `{ '1': 2, '2': 1, '3': 1, '5': 1 }`




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
function Folder(path,name){
    this.path = path;
    this.name = name;
    this.folders = [];
}

Folder.prototype.load = function (arr){
    this.folders = arr;
}
Folder.prototype.toString = function() {
    return this.folders.join()
}
Folder.projectPath = "/Volumes/data/bitbucket/javascript-exercises";

