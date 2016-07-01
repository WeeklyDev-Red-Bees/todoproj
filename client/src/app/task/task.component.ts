import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.service';

@Component({
  selector: 'li',
  template: require('./task.html')
})
export class TaskComponent {
  @Input('task') task: Task;
  @Input('idx') idx;
  @Output() onClick = new EventEmitter();

  constructor() {

  }

  checkClick() {
    this.onClick.emit(this.idx);
  }
}
