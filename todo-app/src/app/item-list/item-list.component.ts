import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  private searchText = "";
  items: TodoItemDto[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.refreshItems();
  }

  refreshItems() {
    this.todoService.getAll(this.searchText).then(data => this.items = data);
  }

  editItem(item: TodoItemDto) {
    this.router.navigate(["details", item._id]);
    //this.router.navigate(["details", { id: item._id }]);
  }

  deleteItem(item: TodoItemDto) {
    this.todoService.deleteById(item._id).then(_ => this.refreshItems());
  }
  addItem() {
    this.router.navigate(["details"]);
  }

  onSearch(text: string) {
    this.searchText = text;
    this.refreshItems();
  }
}
