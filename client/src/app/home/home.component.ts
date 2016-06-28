import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../taskList';

@Component({
  selector: 'home',
  directives: [TaskListComponent],
  // styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class HomeComponent {
  
}