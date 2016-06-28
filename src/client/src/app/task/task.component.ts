import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Task {
  title: string;
  desc: string;
  color: string;
  completed: boolean;
}

@Component({
  selector: 'task',
  template: require('./task.html')
})
export class TaskComponent {
  @Input('task') task;
  @Input('idx') idx;
  @Output() onClick = new EventEmitter();
  
  constructor() {
    
  }
  
  checkClick() {
    this.onClick.emit(this.idx);
  }
}