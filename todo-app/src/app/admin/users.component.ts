import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
<h3>Lista użytkowników<h3>
<ul>
  <li>Adam</li>
  <li>Monika</li>
  <li>Wojtek</li>
</ul>
  `,
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
