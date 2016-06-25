import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.scss') ],
  template: require('./app.html')
})
export class App {
  constructor() {
  }
  
  ngOnInit() {
    this.title = 'ToDoList for the Red Bees';
  }
}