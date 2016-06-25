import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('bootstrap/dist/css/bootstrap.min.css'),
    require('./app.scss'),
    require('awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css')
  ],
  template: require('./app.html')
})
export class App {
  constructor() {
  }
  
  ngOnInit() {
    this.title = 'ToDoList for the Red Bees';
  }
}