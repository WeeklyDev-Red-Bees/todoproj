import { Component, Input, Output, EventEmitter, Directive, ElementRef, HostListener } from '@angular/core';
// import { Task } from './task.service';
import { Task } from '../app.service';

// @Directive({
//   selector: '[setHover]',
//   host: {
//     '(focus)': 'setFocus(true)',
//     '(blur)': 'setFocus(false)',
//     '(mouseenter)': 'setFocus(true)',
//     '(mouseleave)': 'setFocus(false)'
//   }
// })
// export class TaskDescDirective {
//   private el: HTMLElement;
  
//   constructor(el: ElementRef) {
//     this.el = el.nativeElement;
//   }
  
//   private setFocus(focused: boolean) {
//     // this.el.parentElement.style.maxHeight = focused ? '8em' : '0';
//     // this.el.parentElement.style.transform = `translate(${ focused ? 0 : '0, 2em' }`;
//   }
// }

@Component({
  selector: 'li.task',
  template: require('./task.html'),
  // directives: [TaskDescDirective]
})
export class TaskComponent {
  @Input('task') task: Task;
  @Input('idx') idx;
  @Output() onClick = new EventEmitter();
  
  title: string = "";
  desc: string = "";
  
  // colors: string[] = [
  //   'red',
  //   'orange',
  //   'yellow',
  //   'green',
  //   'blue',
  //   'purple'
  // ];
  
  // focused: FocusStyle = {
  //   maxHeight: '0',
  //   transition: 'transform(0, 2em)'
  // };
  focused: boolean = false;

  constructor() {
    
  }
  
  ngOnInit() {
    this.title = this.task.title;
    this.desc = this.task.desc;
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
    
    // if (this.task.example) {
      // TODO: delete
    // }
    
    console.log('task:', this.task);
  }
  
  setFocus(focused: boolean) {
    // if (focused) {
    //   this.focused = {
    //     maxHeight: '8em',
    //     transition: 'transform(0)'
    //   };
    // } else {
    //   this.focused = {
    //     maxHeight: '0',
    //     transition: 'transform(0, 2em)'
    //   };
    // }
    this.focused = focused;
  }
}