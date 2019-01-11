import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TodoService } from "../todo.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  @ViewChild("myForm") myForm: NgForm;
  id: string | null;
  model: TodoItemDto;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (typeof params["id"] === "undefined") {
        this.id = null;
        this.model = <any>{};
      } else {
        this.id = params["id"];
        this.todoService.getById(this.id).then(data => this.model = data);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submitForm() {
    if (this.id === null) { // dodowanie
      this.todoService.add(this.model).then(_ => this.navigateToList());
    } else {
      this.todoService.update(this.id, this.model).then(_ => this.navigateToList());
    }
  }

  cancelForm() {
    if (!this.myForm.form.dirty || confirm("czy chcesz wyjsc i stracic zmiany??")) {
      this.navigateToList();
    }
  }

  private navigateToList() {
    this.router.navigate(["items"]);
  }
}
