import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup';
import { TaskComponent } from '../task';
import { NewTaskComponent } from '../newTask';
// import { UserService, User, TokenRes, UserRes } from '../user';
import { AppService, User, TokenRes, UserRes, Task, ITask } from '../app.service';
import { EditTaskService, EditTaskComponent, ITaskEdit } from '../editTask';

// Temporary until example tasks can be removed
const uuid = require('node-uuid');

@Component({
  selector: 'home',
  directives: [SignupComponent, TaskComponent, NewTaskComponent, EditTaskComponent],
  // styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class HomeComponent {
  appService: AppService;
  editTaskService: EditTaskService;
  
  user: User;
  tasks: Task[] = [];
  
  uid: string;
  
  constructor(appService: AppService, editTaskService: EditTaskService) {
    this.appService = appService;
    this.editTaskService = editTaskService;
  }
  
  ngOnInit() {
    let colors = [
      'red',
      'orange',
      'green',
      'blue'
    ];
    
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
      console.log('setting user');
      this.user = user;
      // this.tasks = this.user.tasks;
      // if (this.tasks.length === 0 || this.tasks.length !== this.user.tasks.length) {
      let tasks = this.user.tasks;
      tasks.sort((a: Task, b: Task) => {
        if (colors.indexOf(a.color) === -1 || colors.indexOf(b.color) === -1) {
          return 0;
        }
        
        
        if (a.completed && !b.completed) {
          return 1;
        } else if (!a.completed && b.completed) {
          return -1;
        }
        
        
        let colorDiff = colors.indexOf(a.color) - colors.indexOf(b.color);
        if (colorDiff === 0) {
          if (a.createdAt < b.createdAt) {
            return -1;
          } else if (a.createdAt > b.createdAt) {
            return 1;
          } else if (a.createdAt === b.createdAt) {
            return 0;
          }
        } else {
          return colorDiff;
        }
      });
      this.tasks = this.user.tasks;
      console.log('sorted tasks:', tasks);
        // this.tasks = tasks;
      // }
    });
  }
  
  openNewTask(): void {
    let task: ITask = {
      title: "",
      desc: "",
      color: "blue"
    };
    let uid: string = this.editTaskService.open(new Task(task));
    this.editTaskService.listener.subscribe((taskEdit: ITaskEdit) => {
      if (taskEdit.uid === uid) {
        this.appService.addTask(taskEdit.task).subscribe((user: UserRes) => {
          // this.user = user;
          console.log('task should have been added.');
        });
        console.log('trying to save:', taskEdit.task);
      }
    });
  }
}