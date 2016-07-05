import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup';
import { TaskComponent } from '../task';
import { NewTaskComponent } from '../newTask';
// import { UserService, User, TokenRes, UserRes } from '../user';
import { AppService, User, TokenRes, UserRes, Task } from '../app.service';

// Temporary until example tasks can be removed
const uuid = require('node-uuid');

@Component({
  selector: 'home',
  directives: [SignupComponent, TaskComponent, NewTaskComponent],
  // styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class HomeComponent {
  appService: AppService;
  user: User;
  tasks: Task[] = [];
  
  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  ngOnInit() {
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
    //     _id: uuid.v1(),
    //     title: 'Pick up Dry Cleaning',
    //     desc: "Ticket #24, at Al's Drycleaning.",
    //     color: v,
    //     completed: false,
    //     example: true
    //   }
    // });
    
    this.appService.userEmitter.subscribe((user: User) => {
      this.user = user;
      // this.tasks = this.user.tasks;
      if (this.tasks.length === 0 || this.tasks.length !== this.user.tasks.length) {
        this.tasks = this.user.tasks;
      }
    });
    
    // this.appService.tasksEmitter.subscribe((tasks: Task[]) => {
    //   this.tasks = tasks;
    // });
  }
  
  setChecked(idx: number): void {
    let task = this.tasks[idx];
    this.tasks[idx].completed = !task.completed;
  }
}