/**
//md
### Modelowanie danych
- zaproponuj model danych (stworz obiekt JSON) opisujacy informacje o filmie
    - dane dla przykladowego filmu [Choc Goni Nas Czas](http://www.filmweb.pl/Choc.Goni.Nas.Czas)
    - film posiada pola: `_id, name, description, director, genres(string[]), releaseDate(Date), rating(double), cast({actor,role}[])`
    - z kazdym filmem skojarzona jest lista komentarzy, komentarz posiada pola: `author, content`
- napisz kod dodajacy film oraz dwa komentarze do bazy danych (bazy danych `moviedb`, kolekcja `movies`)
//md
*/

//md:javascript
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
//md:javascript





