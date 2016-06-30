import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup';
import { LoginComponent } from '../login';
import { TaskListComponent } from '../taskList';

@Component({
  selector: 'home',
  directives: [SignupComponent, LoginComponent, TaskListComponent],
  // styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class HomeComponent {
  
}