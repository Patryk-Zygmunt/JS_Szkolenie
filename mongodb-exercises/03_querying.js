//md:javascript
/// <reference path="./msa.metadata.d.ts" />
/// <reference path="./node_modules/mongo-shell-assistant/s.d.ts" />
var db = new Mongo("localhost:27017").getDB("northwind_mongo");
print(db.getCollectionNames());
load("./node_modules/mongo-shell-assistant/s.js");

// nadpisanie domyslnej metody cursor.pretty();
DBQuery.prototype.shellPrint = function (){
    print(s.dump(this.toArray()));
}
//md:javascript


/**
//md
### Stworzenia bazy danych **Northwind**
- stworz baze danych `northwind_mongo` zawierajaca przykladowe dane wpisujac komende `mongorestore --archive=northwind_mongo.archive --gzip`
//md
*/

/**
//md
### Konfiguracja **mongo-shell-assistant**
- dodaj wpis dotyczacy stworzonej bazy danych `northwind_mongo` do pliku konfiguracyjnego `msa.config.json` 
- wykonaj komende z lini polecen `msa` generujaca metadane dla nowej bazy
- zainstaluj lokalnie mongo-shell-assistant wykonujac `npm install mongo-shell-assistant`
- wykonaj w mongo shell powyzszy kod JS (ladujacy skrypt `./node_modules/mongo-shell-assistant/s.js` oraz nadpisujacy implementacje metody `pretty()`)
//md
*/


/**
//md
### Napisz nastepujace zapytania
//md
*/


/**
//md
- zapytanie zwracajace `name` i `unitPrice` pierwszych 10 produktow posortowanych malejaco po `unitPrice` 
//md
*/

//remove
//md:javascript
db.products.find({},{name:1, unitPrice:1}).sort({unitPrice:-1}).limit(10).pretty();
//md:javascript
//remove


/**
//md
- zapytanie zwracajace produkty ktorych `unitPrice > 50` oraz `unitsInStock > 0`
//md
*/

//remove
//md:javascript
db.products.find({unitPrice:{ $gt: 50}, unitsInStock:{ $gt: 0}},{}).pretty();
//md:javascript
//remove


/**
//md
- zapytanie zwracajace produkty ktorych `unitsInStock = 0` lub `discontinued = true`
//md
*/

//remove
//md:javascript
db.products.find( { $or : [ { unitsInStock: 0}, { discontinued: false}] },{}).pretty();
//md:javascript
//remove


/**
//md
- zapytanie zwracajace zamowienia dostarczone w roku 1998 ktorych `ship.country = "Poland"`
    - mozesz uzyc przedzialu dat aby znalezc zamowienia z roku 1998
//md
*/


//remove
//md:javascript
db.orders.find({"ship.country" : "Poland", shippedDate: { $gte : new Date(1998,0,1), $lt : new Date(1999,0,1) }}).pretty();
//md:javascript
//remove


/**
//md
- zapytanie zwracajace zamowienia na ktorych znajduja sie produkty z kategorii  "Seafood"
    - uzyj 2 zapytan
//md
*/

//remove
//md:javascript
var productsWithIds = db.products.find({categories: "Seafood"},{_id:1}).toArray();
var ids = productsWithIds.map(p => p._id );
var orders = db.orders.find({items: { $elemMatch : { productId : { $in : ids}} }})

var ordersProducutsIds = orders.map( o => o.items.map(i => i.productId).sort() )
ordersProducutsIds.forEach(ii => {
    print(ii.join(","), "=>", ii.filter( iii => ids.indexOf(iii) != -1 ).join(",") );
});
print(ids.sort().join(","));
//md:javascript
//remove