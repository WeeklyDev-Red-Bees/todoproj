import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task',
  template: require('./task.html')
})
export class Task {
  @Input('task') task;
  @Input('idx') idx;
  @Output() onClick = new EventEmitter();
  
  constructor() {
    
  }
  
  checkClick() {
    this.onClick.emit(this.idx);
  }
}