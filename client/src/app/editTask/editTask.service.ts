import { Injectable, EventEmitter } from '@angular/core';
import { AppService, Task, ITask } from '../app.service';

const uuid = require('node-uuid');

export interface ITaskEdit {
  uid: string;
  task: Task;
}

@Injectable()
export class EditTaskService {
  appService: AppService;
  
  listener: EventEmitter<ITaskEdit> = new EventEmitter<ITaskEdit>();
  openListener: EventEmitter<string> = new EventEmitter<string>();
  
  task: Task;
  uid: string;
  
  isOpen: boolean = false;
  
  emit(task: Task): void {
    let edit: ITaskEdit = {
      uid: this.uid,
      task
    };
    
    this.listener.emit(edit);
  }
  
  open(task: Task, size: string = 'sm'): string {
    this.task = task;
    this.uid = uuid.v1();
    this.openListener.emit(size);
    return this.uid;
  }
}