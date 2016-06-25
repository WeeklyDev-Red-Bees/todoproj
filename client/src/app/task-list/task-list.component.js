import { Component } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'task-list',
  directives: [Task],
  template: require('./task-list.html')
})
export class TaskList {
  tasks = [];
  
  constructor() {
    let colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple'
    ];
    
    this.tasks = colors.map((v) => {
      return {
        title: 'Pick up Dry Cleaning',
        desc: "Ticket #24, at Al's Drycleaning.",
        color: v,
        completed: false
      };
    });
  }
  
  getTasks() {
    return this.tasks;
  }
  
  setChecked(idx) {
    let task = this.tasks[idx];
    this.tasks[idx].completed = !task.completed;
  }
}