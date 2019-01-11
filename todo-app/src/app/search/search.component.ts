import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
<div>
  <input type="text" [(ngModel)]="text" />
  <button (click)="search()">{{buttonText}}</button>
</div>
`,
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  text = "";
  @Input() buttonText = "";
  @Output() searchClicked = new EventEmitter();

  search() {
    this.searchClicked.next(this.text);
  }
}
