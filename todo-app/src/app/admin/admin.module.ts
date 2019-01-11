import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminappComponent } from './adminapp.component';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from "@angular/router";


export const routes: Routes = [
  {
    path: '', component: AdminappComponent,
    children: [
      { path: '', redirectTo: "users", pathMatch: "full" },
      { path: "users", component: UsersComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AdminappComponent, UsersComponent]
})
export class AdminModule {
  constructor() {
  }
}
