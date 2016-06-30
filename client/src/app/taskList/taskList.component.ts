import { Component, OnInit, Input } from '@angular/core';
import { TaskComponent, Task } from '../task';

@Component({
  selector: 'task-list',
  directives: [TaskComponent],
  template: require('./taskList.html')
})
export class TaskListComponent implements OnInit {
  @Input('tasks') tasks: Task[];
  
  constructor() {
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
    //     title: 'Pick up Dry Cleaning',
    //     desc: "Ticket #24, at Al's Drycleaning.",
    //     color: v,
    //     completed: false
    //   }
    // });
  }
  
  setChecked(idx: number): void {
    let task = this.tasks[idx];
    this.tasks[idx].completed = !task.completed;
  }
}