import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TodoService {

  constructor(private http: Http) {
  }

  getAll(text: string) {
    return this.http
      .get("/api/todos" + (text ? "?text=" + text : ""))
      .toPromise()
      .then(response => response.json() as TodoItemDto[]);
  }

  getById(id: string) {
    return this.http
      .get("/api/todos/" + id)
      .toPromise()
      .then(response => response.json() as TodoItemDto);
  }

  add(todoItem: TodoItemDto) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post("/api/todos", JSON.stringify(todoItem), { headers: headers })
      .toPromise();
  }

  update(id: string, todoItem: TodoItemDto) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .put("/api/todos/" + id, JSON.stringify(todoItem), { headers: headers })
      .toPromise();
  }

  deleteById(id: string) {
    return this.http
      .delete("/api/todos/" + id)
      .toPromise();
  }
}




// @Injectable()
// export class DataProviderService{
//     private _data : Item[]= [
//         {id : 0, name:"zero" },
//         {id : 1, name:"jeden" }

//     ];

//     @delayDecorator
//     getItems() {
//         return this.createObservable( () => this._data);
//     }

//     @delayDecorator
//     getItemBy(id:number) : Observable<Item>{
//         return this.createObservable( () => {
//             var item = this._data.find( i => i.id == id);
//             item = this.copyItem(item);
//             return item;
//         });
//     }

//     @delayDecorator
//     updateItem(item:Item){
//         return this.createObservable( () => {
//             var index = this._data.findIndex( i => i.id == item.id);
//             if(index !== -1){
//                 this._data[index] = item;
//             }
//             return undefined;
//         });
//     }

//     @delayDecorator
//     deleteItemById(id:number){
//         return this.createObservable( () => {
//             var index = this._data.findIndex( item => item.id === id);
//             if(index !== -1){
//                 this._data.splice(index, 1);
//             } 
//             return undefined;
//         });
//     }

//     @delayDecorator
//     addItem(item:Item){
//         return this.createObservable( () => {
//             var maxValue = this._data.reduce((max,c) => Math.max(max,c.id), 0);
//             item.id = maxValue+1;
//             this._data.push(item);
//             return item;
//         });


//     }

//     private copyItem(item:Item):Item{
//         return JSON.parse(JSON.stringify(item));
//     }

//     private createObservable<T>( f : () => T)  : Observable<T> {
//         return Observable.create( (o : Observer<any>) => {
//             try{
//                 var value = f();
//                 o.next(value);
//                 o.complete();
//             }
//             catch(error){
//                 o.error(error);
//             }
//         });
//     }

// }

