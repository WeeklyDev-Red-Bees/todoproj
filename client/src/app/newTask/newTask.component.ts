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
  
  canSubmit: boolean = false;
  
  constructor(appService: AppService) {
    this.appService = appService;
    this.task = new Task({
      title: "",
      desc: "",
      color: "red",
      completed: false
    });
  }
  
  saveTask(): void {
    console.log('saving task:', this.task.getUpdate());
  }
  
  canSubmitCheck(): void {
    if (!this.task.titleMod) {
      this.canSubmit = false;
      return;
    }
    if (!this.task.descMod) {
      this.canSubmit = false;
      return;
    }
    
    this.canSubmit = true;
  }
  
  get title(): string {
    return this.task.title;
  }
  
  set title(v: string) {
    this.task.title = v;
    this.canSubmitCheck();
  }
  
  get desc(): string {
    return this.task.desc;
  }
  
  set desc(v: string) {
    this.task.desc = v;
    this.canSubmitCheck();
  }
}