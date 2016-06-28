/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
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

  title: string = 'ToDoList for the Red Bees';

  constructor() {
    
  }

  ngOnInit() {
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
