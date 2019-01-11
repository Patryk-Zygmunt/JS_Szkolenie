/**
### Konfiguracja narzedzia  **mongo-shell-assistant**
- postepuj zgodnie z (instrukcja)(https://github.com/marcinnajder/mongo-shell-assistant/blob/master/README.md)
    - zainstaluj globalnie mongo-shell-assistant wykonujac `npm install -g mongo-shell-assistant`
    - wykonaj polecenie `msa`, zostanie stworzony plik konfiguracyjny `msa.config.json`
    - zmien plik konfiguracyjny aby wskazywal na danych danych o nazwie `moviedb`
    - wykonaj raz jeszcze pplecenie `msa`, zostanie stworzony plik `msa.metadata.d.ts` zawierajace matadane
    - przekopiuj tekst znajdujacy sie na konsoli do pliku skryptu
*/

/**
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
*/


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

