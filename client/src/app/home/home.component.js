import { Component } from '@angular/core';
import jQuery from 'jquery';

@Component({
  selector: 'home',
  styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class Home {
  constructor() {
    this.name = 'Red Bees';
    this.tempName = '';
    
    console.log(jQuery);
  }
  
  changeName() {
    console.log(this.name);
    console.log(this.tempName);
    this.name = this.tempName;
  }
}