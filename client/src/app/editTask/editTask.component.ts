import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { EditTaskService, ITaskEdit } from './editTask.service';
import { AppService, Task, ITask } from '../app.service';

@Component({
  selector: 'editTask',
  directives: [MODAL_DIRECTIVES],
  template: require('./editTask.html')
})
export class EditTaskComponent {
  appService: AppService;
  editTaskService: EditTaskService;
  
  // @Input('task') _task: Task | ITask;
  // @Output() taskUpdated: EventEmitter<Task> = new EventEmitter<Task>();
  
  @ViewChild(ModalComponent)
  private modal: ModalComponent;
  
  task: Task;
  uid: string;
  listener: EventEmitter<Task> = new EventEmitter<Task>();
  
  isOpen: boolean = false;
  canSubmit: boolean = false;
  
  constructor(appService: AppService, editTaskService: EditTaskService) {
    this.appService = appService;
    this.editTaskService = editTaskService;
    
    let task: ITask = {
      title: "",
      desc: "",
      color: "blue"
    };
    this.task = new Task(task);
  }
  
  ngOnInit() {
    this.editTaskService.openListener.subscribe((size: string) => {
      if (!this.isOpen) {
        // this.task = this.editTaskService.task;
        this.task = new Task(this.editTaskService.task.toObject());
        this.modal.open(size);
      }
    });
  }
  
  canSubmitCheck(): void {
    if (!this.task.title) {
      this.canSubmit = false;
      return;
    }
    if (!this.task.desc) {
      this.canSubmit = false;
      return;
    }
    
    if (this.task.titleMod || this.task.descMod) {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
    
    // this.canSubmit = true;
  }
  
  get editTitle(): string {
    return this.task.title;
  }
  
  set editTitle(v: string) {
    this.task.title = v;
    this.canSubmitCheck();
  }
  
  get editDesc(): string {
    return this.task.desc;
  }
  
  set editDesc(v: string) {
    this.task.desc = v;
    this.canSubmitCheck();
  }
  
  onDismiss(): void {
    this.isOpen = false;
  }
  
  onClose(): void {
    this.isOpen = false;
    this.editTaskService.emit(this.task);
  }
}