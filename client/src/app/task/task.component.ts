import { Component, Input, Output, EventEmitter, Directive, ElementRef, HostListener } from '@angular/core';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AppService, Task, UserRes } from '../app.service';

declare var jQuery: any;

@Component({
  selector: 'li.task',
  template: require('./task.html'),
  styles: [require('./task.scss')],
  directives: [MODAL_DIRECTIVES],
})
export class TaskComponent {
  @Input('task') task: Task;
  @Input('idx') idx;
  // @Output() onClick = new EventEmitter();
  appService: AppService
  
  title: string = "";
  desc: string = "";
  
  colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
  
  extended: boolean = true;
  
  // focused: FocusStyle = {
  //   maxHeight: '0',
  //   transition: 'transform(0, 2em)'
  // };
  focused: boolean = false;

  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  ngOnInit() {
    this.title = this.task.title;
    this.desc = this.task.desc;
  }

  checkClick() {
    // this.onClick.emit(this.idx);
    this.task.completed = !this.task.completed;
    // this.appService.editTask(this.task).subscribe((res: UserRes) => {
    //   if (res.success) {
    //     let task = res.user.tasks.find((t) => t._id === this.task._id);
    //     if (task) {
    //       this.task = task;
    //     }
    //   }
    // });
    this.updateTask();
    // TODO: Directly change and save completed value
  }
  
  setColor(color: string) {
    this.task.color = color;
    this.updateTask();
    // TODO: Save color change
  }
  
  deleteTask() {
    // TODO: Implement delete
    
    // if (this.task.example) {
      // TODO: delete
    // }
    this.appService
    console.log('task:', this.task);
  }
  
  updateTask(): void {
    this.appService.editTask(this.task).subscribe((res: UserRes) => {
      if (res.success) {
        let task = res.user.tasks.find((t) => t._id === this.task._id);
        if (task) {
          this.task = task;
        }
      }
    });
  }
}