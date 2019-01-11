## 01_dataModeling.js
### Modelowanie danych
- zaproponuj model danych (stworz obiekt JSON) opisujacy informacje o filmie
    - dane dla przykladowego filmu [Choc Goni Nas Czas](http://www.filmweb.pl/Choc.Goni.Nas.Czas)
    - film posiada pola: `_id, name, description, director, genres(string[]), releaseDate(Date), rating(double), cast({actor,role}[])`
    - z kazdym filmem skojarzona jest lista komentarzy, komentarz posiada pola: `author, content`
- napisz kod dodajacy film oraz dwa komentarze do bazy danych (bazy danych `moviedb`, kolekcja `movies`)
```javascript
//remove

// przykladowy model danych
var movie = {
    name: "Choć goni nas czas",
    description: "Historia dwóch umierających mężczyzn, którzy pod wpływem szalonych przygód zostają przyjaciółmi.",
    director: "Rob Reiner",
    genres: ["Dramat", "Komedia"],
    releaseDate: new Date(2007, 11, 16),
    rating: 7.6,
    cast: [
    {
        actor: "Jack Nicholson",
        role: "Edward Cole",
    },
    {
        actor: "Morgan Freeman",
        role: "Carter Chambers"
    }]
};
var comments = [
    {
        author: "marcin",
        content: "film calkiem ok",
    },
    {
        author: "lukasz",
        content: "moze byc",
    },
];

var mongo = new Mongo("localhost:27017");
var db = mongo.getDB("moviedb");
var moviesCollection = db.movies;
var commentsCollection = db.comments;

// dodanie przykladowych danych
var {insertedId} = moviesCollection.insertOne(movie);
print("dodano film o ID: " + insertedId);

comments.forEach(function(comment){
    comment.movieId = insertedId;
})
var {insertedIds} = commentsCollection.insertMany(comments);
print("dodano komentarze od Id: " + insertedIds);


// wyswietlenie danych
moviesCollection.find().pretty()
commentsCollection.find().pretty()


// ewentualne usuniecie calej bazy danych
db.dropDatabase();

//remove
```

## 02_crud.js
### Konfiguracja narzedzia  **mongo-shell-assistant**
- postepuj zgodnie z (instrukcja)(https://github.com/marcinnajder/mongo-shell-assistant/blob/master/README.md)
    - zainstaluj globalnie mongo-shell-assistant wykonujac `npm install -g mongo-shell-assistant`
    - wykonaj polecenie `msa`, zostanie stworzony plik konfiguracyjny `msa.config.json`
    - zmien plik konfiguracyjny aby wskazywal na danych danych o nazwie `moviedb`
    - wykonaj raz jeszcze pplecenie `msa`, zostanie stworzony plik `msa.metadata.d.ts` zawierajace matadane
    - przekopiuj tekst znajdujacy sie na konsoli do pliku skryptu
### Implementacja CRUDowych metod 
- zdefiniuj zmienne globalne `moviesCollection` oraz `commentsCollection` odpowiadajace kolekcja w bazie danych
- zaimplementuj nastepujace metody JavaScript
    - `addMovie(movie) : ObjectId` - metoda dodaje do bazy danych film i zwraca nadany ID
    - `getMovieById(id) : Movie` - metoda zwraca film dla wskazanego ID, zwraca null jesli film o danym ID nie istnieje
    - `getAllMovies() : Movie[]` - metoda zwraca tablice zawierajaca wszystkie filmy
    - `deleteByName(name)` - metoda usuwa filmy o podanej nazwie
    - `setGenreAndRating(movieId, genre, rating)` - metoda dodaje gatunek do kolekcji gatunkow (jesli juz taki istnieje to nie duplikuje wpisu), jednoczesnie ustawia nowa wartosc oceny filmu
    - `getCommentsAuthors()` - metoda zwraca unikatowa liste wszystkich autorow komentarzy
- przetestuj dzialanie metod wykonujac przykladowy ponizszy kod
```javascript

// przykladowe dokumenty
var sampleMovie = {
    name: "Choć goni nas czas",
    description: "Historia dwóch umierających mężczyzn, którzy pod wpływem szalonych przygód zostają przyjaciółmi.",
    director: "Rob Reiner",
    genres: ["Dramat", "Komedia"],
    releaseDate: new Date(2007, 11, 16),
    rating: 7.6,
    cast: [
    {
        actor: "Jack Nicholson",
        role: "Edward Cole",
    },
    {
        actor: "Morgan Freeman",
        role: "Carter Chambers"
    }]
};
var sampleComments = [
    {
        author: "marcin",
        content: "film calkiem ok",
    },
    {
        author: "lukasz",
        content: "moze byc",
    },
];

//remove

// dostep do kolekcji
var moviesCollection = db.movies;
var commentsCollection = db.comments;


// implementacja metod
function addMovie(movie){
     return moviesCollection.insertOne(movie).insertedId;     
}
function getMovie(movieId){
    return moviesCollection.findOne({_id:movieId});
}
function getAllMovies(){
    return moviesCollection.find().toArray();
}
function deleteByName(name){
    moviesCollection.deleteMany({name: name});
}
function setGenreAndRating(movieId, genre, rating){
    moviesCollection.updateOne({_id: movieId}, {
        $addToSet: { genres : genre },
        $set: { rating: rating}
    });
}
function getCommentsAuthors(){
    return commentsCollection.distinct("author", { });
}

// przykladowy kod testujacy dzialanie metod
var sampleMovieId = addMovie(sampleMovie);
print("dodano film o ID: " + sampleMovieId);

var sampleMovieFromDb = getMovie(sampleMovieId);
print("pobrano z bazy danych dokument: ");
printjson(sampleMovieFromDb);

var allMoviesFromDb = getAllMovies();
print("aktualna liczba filmow zapisanych w bazie to: ", allMoviesFromDb.length);

deleteByName(sampleMovieFromDb.name);
print(`usunieto filmy o nazwie "${sampleMovieFromDb.name}"`);
print("aktualna liczba filmow zapisanych w bazie to: ", getAllMovies().length);

var sampleMovieId = addMovie(sampleMovie);
print("ponownie dodano film o ID: " + sampleMovieId);

setGenreAndRating(sampleMovieId, "Komediodramaty‎", 10);
print("aktualnie przypisane gatunki to: ", getMovie(sampleMovieId).genres); 
print("aktuala ocena filmu to: ", getMovie(sampleMovieId).rating); 


print("lista unikatowych autorow komentarzy: ", getCommentsAuthors()); 
commentsCollection.insertMany(
    commentsCollection.find()
        .toArray()
        .map(function(c){
            delete c._id;
            //c.author = c.author.toUpperCase();
            return c;
        })
);
print("po zduplikowaniu wszystkich istniejacych komentarzy, aktualna liczba komenarzy to:", commentsCollection.count()); 
print("lista unikatowych autorow komentarzy: ", getCommentsAuthors()); 

//remove
```

## 03_querying.js
```javascript
/// <reference path="./msa.metadata.d.ts" />
/// <reference path="./node_modules/mongo-shell-assistant/s.d.ts" />
var db = new Mongo("localhost:27017").getDB("northwind_mongo");
print(db.getCollectionNames());
load("./node_modules/mongo-shell-assistant/s.js");

// nadpisanie domyslnej metody cursor.pretty();
DBQuery.prototype.shellPrint = function (){
    print(s.dump(this.toArray()));
}
```
### Stworzenia bazy danych **Northwind**
- stworz baze danych `northwind_mongo` zawierajaca przykladowe dane wpisujac komende `mongorestore --northwind_mongo.archive --gzip`
### Konfiguracja **mongo-shell-assistant**
- dodaj wpis dotyczacy stworzonej bazy danych `northwind_mongo` do pliku konfiguracyjnego `msa.config.json` 
- wykonaj komende z lini polecen `msa` generujaca metadane dla nowej bazy
- zainstaluj lokalnie mongo-shell-assistant wykonujac `npm install mongo-shell-assistant`
- wykonaj w mongo shell powyzszy kod JS (ladujacy skrypt `./node_modules/mongo-shell-assistant/s.js` oraz nadpisujacy implementacje metody `pretty()`)
### Napisz nastepujace zapytania
- zapytanie zwracajace `name` i `unitPrice` pierwszych 10 produktow posortowanych malejaco po `unitPrice` 
```javascript
db.products.find({},{name:1, unitPrice:1}).sort({unitPrice:-1}).limit(10).pretty();
```
- zapytanie zwracajace produkty ktorych `unitPrice > 50` oraz `unitsInStock > 0`
```javascript
db.products.find({unitPrice:{ $gt: 50}, unitsInStock:{ $gt: 0}},{}).pretty();
```
- zapytanie zwracajace produkty ktorych `unitsInStock = 0` lub `discontinued = true`
```javascript
db.products.find( { $or : [ { unitsInStock: 0}, { discontinued: false}] },{}).pretty();
```
- zapytanie zwracajace zamowienia dostarczone w roku 1998 ktorych `ship.country = "Poland"`
    - mozesz uzyc przedzialu dat aby znalezc zamowienia z roku 1998
```javascript
db.orders.find({"ship.country" : "Poland", shippedDate: { $gte : new Date(1998,0,1), $lt : new Date(1999,0,1) }}).pretty();
```
- zapytanie zwracajace zamowienia na ktorych znajduja sie produkty z kategorii  "Seafood"
    - uzyj 2 zapytan
```javascript
var productsWithIds = db.products.find({categories: "Seafood"},{_id:1}).toArray();
var ids = productsWithIds.map(p => p._id );
var orders = db.orders.find({items: { $elemMatch : { productId : { $in : ids}} }})

var ordersProducutsIds = orders.map( o => o.items.map(i => i.productId).sort() )
ordersProducutsIds.forEach(ii => {
    print(ii.join(","), "=>", ii.filter( iii => ids.indexOf(iii) != -1 ).join(",") );
});
print(ids.sort().join(","));
```

