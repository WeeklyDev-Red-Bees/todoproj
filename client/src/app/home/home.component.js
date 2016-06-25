import { Component, Inject } from '@angular/core';
import { LoginComponent } from '../login';
import { SignupComponent } from '../signup';

@Component({
  selector: 'home',
  directives: [LoginComponent, SignupComponent],
  styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class Home {
  
  tasks = [];
  
  constructor(@Inject('TASKS') tasks) {
    this.tasks = tasks;
    // let colors = [
    //   'red',
    //   'orange',
    //   'yellow',
    //   'green',
    //   'blue',
    //   'purple'
    // ];
    // this.tasks = colors.map((v) => {
    //   return {
    //     title: 'Pick up Dry Cleaning',
    //     desc: "Ticket #24, at Al's Drycleaning.",
    //     color: v,
    //     completed: false
    //   }
    // });
    
    console.log(this.tasks);
  }
  
  getTasks() {
    return this.tasks;
  }
  
  setChecked(idx) {
    let task = this.tasks[idx];
    this.tasks[idx].completed = !task.completed;
  }
}