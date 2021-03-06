import { Component, Input, Output, EventEmitter, Directive, ElementRef, HostListener } from '@angular/core';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AppService, Task, UserRes } from '../app.service';
import { EditTaskService, ITaskEdit } from '../editTask';

declare var jQuery: any;

@Component({
  selector: 'li.task',
  template: require('./task.html'),
  directives: [MODAL_DIRECTIVES],
})
export class TaskComponent {
  @Input('task') task: Task;
  @Input('idx') idx;
  // @Output() onClick = new EventEmitter();
  appService: AppService;
  editTaskService: EditTaskService;
  
  // title: string = "";
  // desc: string = "";
  
  descSelector: string;
  
  colors: string[] = [
    'red',
    'orange',
    // 'yellow',
    'green',
    'blue',
    // 'purple'
  ];
  
  extended: boolean = false;
  
  // focused: FocusStyle = {
  //   maxHeight: '0',
  //   transition: 'transform(0, 2em)'
  // };
  focused: boolean = false;

  constructor(appService: AppService, editTaskService: EditTaskService) {
    this.appService = appService;
    this.editTaskService = editTaskService;
  }
  
  ngOnInit() {
    // this.title = this.task.title;
    // this.desc = this.task.desc;
    // this.descSelector = `#task-${this.idx} .desc`;
    // jQuery(this.descSelector).collapse({ toggle: false });
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
    this.appService.deleteTask(this.task).subscribe((res: UserRes) => {
      console.log('user res:', res);
    });
    // console.log('task:', this.task);
  }
  
  updateTask(): void {
    this.appService.editTask(this.task).subscribe((res: UserRes) => {
      if (res.success) {
        // let task = res.user.tasks.find((t) => t._id === this.task._id);
        let task = this.appService.user.tasks.find((t) => t._id === this.task._id);
        if (task) {
          this.task = task;
        }
      }
    });
  }
  
  openEditTask(): void {
    let task = this.task;
    let uid: string = this.editTaskService.open(task);
    console.log('uid:', uid);
    this.editTaskService.listener.subscribe((taskEdit: ITaskEdit) => {
      console.log('in edit cb');
      console.log('taskEdit:', taskEdit);
      if (taskEdit.uid === uid) {
        console.log('yay');
        this.task = taskEdit.task;
        this.updateTask();
      }
    });
  }
  // get title(): string {
  //   return this.task.title;
  // }
  
  // set title(v: string) {
  //   this.task.title = v;
  // }
  
  // get desc(): string {
  //   return this.task.desc;
  // }
  
  // set desc(v: string) {
  //   this.task.desc = v;
  // }
  
  extend(): void {
    // TODO: Extend collapsed .desc
    // console.log(jQuery(this.descSelector));
    // jQuery(this.descSelector).collapse('toggle');
    // this.extended = !this.extended;
  }
}