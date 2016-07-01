import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.service';

@Component({
  selector: 'li.task',
  template: require('./task.html')
})
export class TaskComponent {
  @Input('task') task: Task;
  @Input('idx') idx;
  @Output() onClick = new EventEmitter();
  
  colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

  constructor() {

  }

  checkClick() {
    this.onClick.emit(this.idx);
    
    // TODO: Directly change and save completed value
  }
  
  setColor(color: string) {
    this.task.color = color;
    
    // TODO: Save color change
  }
  
  deleteTask() {
    // TODO: Implement delete
  }
}
