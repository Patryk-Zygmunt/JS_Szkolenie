## todoService.ts - moduł dostarczający CRUDowe operacje na danych składowanych w MongoDB

- baza danych to `"mongodb://localhost:27017/tododb"`
- kolekcja MongoDB to `todo`
- dokument ma następujący schemat 

```javascript
interface TodoItemDto {
    _id: any; // string | ObjectID
    name: string;
}
```

- moduł dostarcza metody:
    - `export async function getAll(text?: string): Promise<TodoItemDto[]>` - pobieranie wszystkich wpisów, opcjonalny patamer `text` pozwala wyszukać wpisy po nazwie `{ name: { $regex: text } }`
    - `export async function getById(id: ObjectID): Promise<TodoItemDto | null>` - pobieranie pojedyńczego wpisu, gdy nie istnieje wpis o danym id zwracany jest `null`
    - `export async function add(todoItem: TodoItemDto): Promise<ObjectID>` - dodanie nowego wpisu, zwracany jest nadany id
    - `export async function update(id: ObjectID, todoItem: TodoItemDto): Promise<void>` - aktualizacja istniejącego wpisu
    - `export async function deleteById(id: Object): Promise<void> ` - usunięcie istniejącego wpisu
    - `export async function dropAll(): Promise<void>` - usunięcie wszystkich wpisów

- **uwaga:**
    - skorzystać z oficjalnego drivera mongodb `import * as mongodb from "mongodb";`




## expressApp.ts - moduł tworzący aplikację express.js dostarczającą usługi dla CRUDowych operacji

- moduł zawiera metodę tworzącą aplikację express.js `export function createApp(): express.Express { .. }`
- dostępne usługi to
    - `app.get('/api/todos/dropall', ... )`
    - `app.get('/api/todos', ... )`
    - `app.get('/api/todos/:id', ... )`
    - `app.post('/api/todos', ... )`
    - `app.delete('/api/todos/:id', ...)`
    - `app.put('/api/todos/:id', ...)`
- usługi są odpowiednikami metod modułu `todoService.ts`

- **uwaga:**
    - skorzystać z istniejących middleware `import * as bodyParser from "body-parser";` i 
`import * as morgan from "morgan";`




## index.ts - moduł statujący serwer HTTP

- skrypt startuje aplikacje express.js nasłuchując na porcie `5634`
- przestować działanie usług za pomocą narzędzia **Postman**