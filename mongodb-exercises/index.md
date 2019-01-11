### Modelowanie danych
- zaproponuj model danych opisujacy informacje o filmie
    - film posiada pola: `_id, name, description, director, genres(string[]), releaseDate(Date), rating(double), cast({actor,role}[])`
    - z kazdym filmem skojarzona jest lista komentarzy, komentarz posiada pola: `author, content`
- zdefiniuj obiekty JavaScript dla przykladowego filmu [Choc Goni Nas Czas](http://www.filmweb.pl/Choc.Goni.Nas.Czas)
- filmy przechowywane beda w kolekcji `moview` w bazie danych `filmweb`
- zaimplementuj nastepujace metody:
    - `addMovie(movie) : ObjectId` - metoda dodaje do bazy danych film i zwraca nadany ID
    - `getMoviewById(id) : Movie` - metoda zwraca film dla wskazanego ID, zwraca null jesli film o danym ID nie istnieje
    - `getAllMovies() : Movie[]` - metoda zwraca tablice zawierajaca wszystkie filmy
    - `deleteById(id)` - metoda usuwa film o zadanym ID
    - `addNewGenre(movieId, genre)` - metoda dodaje gatunek do kolekcji gatunkow, jesli juz taki istnieje to nie duplikuje wpisu
    - `add(movieId, rating)` - metoda ustawia nowa ocene dla filmu o zadanym ID
    - `addComment(movieId, comment)` - metoda dodaje komentarz dla filmu o podanym ID
    - `getAllCommentsForMovie(movieId)` - metoda zwraca wszystkie komentarze dla filmu o zadanym ID
    


### Modelowanie danych
- 
- 
### Stworzenia bazy danych Northwind z kopii zapasowej
- wykonaj komende z lini polecen: `mongorestore --archive=northwind_mongo.archive --gzip`
- na domyslnym serwerze Mongo DB (localhost:27017) stworzona zostala baza danych `northwind_mongo`
### Kursory
- a
    - a
### Zapytania
- a
    - a
