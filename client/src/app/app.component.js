import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.scss') ],
  template: require('./app.html')
})
export class App {
  constructor() {
    // this.name = 'Red Bees';
    // this.tempName = '';
  }
  
  changeName() {
    // this.name = this.tempName;
  }
}