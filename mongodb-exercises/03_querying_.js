/// <reference path="./msa.metadata.d.ts" />
/// <reference path="./node_modules/mongo-shell-assistant/s.d.ts" />
var db = new Mongo("localhost:27017").getDB("northwind_mongo");
print(db.getCollectionNames());
load("./node_modules/mongo-shell-assistant/s.js");

// nadpisanie domyslnej metody cursor.pretty();
DBQuery.prototype.shellPrint = function (){
    print(s.dump(this.toArray()));
}


/**
### Stworzenia bazy danych **Northwind**
- stworz baze danych `northwind_mongo` zawierajaca przykladowe dane wpisujac komende `mongorestore --northwind_mongo.archive --gzip`
*/

/**
### Konfiguracja **mongo-shell-assistant**
- dodaj wpis dotyczacy stworzonej bazy danych `northwind_mongo` do pliku konfiguracyjnego `msa.config.json` 
- wykonaj komende z lini polecen `msa` generujaca metadane dla nowej bazy
- zainstaluj lokalnie mongo-shell-assistant wykonujac `npm install mongo-shell-assistant`
- wykonaj w mongo shell powyzszy kod JS (ladujacy skrypt `./node_modules/mongo-shell-assistant/s.js` oraz nadpisujacy implementacje metody `pretty()`)
*/


/**
### Napisz nastepujace zapytania
*/


/**
- zapytanie zwracajace `name` i `unitPrice` pierwszych 10 produktow posortowanych malejaco po `unitPrice` 
*/



/**
- zapytanie zwracajace produkty ktorych `unitPrice > 50` oraz `unitsInStock > 0`
*/



/**
- zapytanie zwracajace produkty ktorych `unitsInStock = 0` lub `discontinued = true`
*/



/**
- zapytanie zwracajace zamowienia dostarczone w roku 1998 ktorych `ship.country = "Poland"`
    - mozesz uzyc przedzialu dat aby znalezc zamowienia z roku 1998
*/




/**
- zapytanie zwracajace zamowienia na ktorych znajduja sie produkty z kategorii  "Seafood"
    - uzyj 2 zapytan
*/

