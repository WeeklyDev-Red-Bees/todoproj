import { Component } from '@angular/core';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AppService, Task } from '../app.service';

@Component({
  selector: 'newTask',
  directives: [MODAL_DIRECTIVES],
  template: require('./newTask.html')
})
export class NewTaskComponent {
  appService: AppService;
  task: Task;
  
  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  saveTask(): void {
    
  }
}