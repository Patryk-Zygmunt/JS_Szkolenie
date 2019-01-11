import './rxImports';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { TodoService } from './todo.service';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
  { path: '', redirectTo: "items", pathMatch: "full" },
  { path: 'items', component: ItemListComponent },
  { path: 'details', component: ItemDetailsComponent },

  // :id - przekazanie parametrow
  { path: 'details/:id', component: ItemDetailsComponent },

  // loadChildren - "lazy loading", leniwe doczytanie modulu pod wejsciu na "/admin/..."
  // canActivate - sprawdz czy nawigacja jest mozliwa
  { path: 'admin', loadChildren: 'app/admin/admin.module.ts#AdminModule', canActivate: [canActivateAdmin] },

  // outlet - nazwany obszar nawigacyjny
  // http://localhost:4200/items(popup:notifications)
  { path: 'notifications', component: NotificationsComponent, outlet: 'popup' },

  // ** - jesli nie znajdzie pasujacej sciezki
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailsComponent,
    SearchComponent,
    NotificationsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    TodoService,
    { provide: canActivateAdmin, useValue: canActivateAdmin }
  ],
  bootstrap: [AppComponent]           // komponent startujacy aplikacje
})
export class AppModule {
}



export function canActivateAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  console.log("canActivateAdmin", { "state.url": state.url, "route.url": route.url });
  // return new Promise<boolean>(function (resolve, reject) {
  //   setTimeout(function () {
  //     const result = confirm("Czy admin jest dostępy ?") === true;
  //     resolve(result);
  //   }, 1000);
  // });
  return true;
}

