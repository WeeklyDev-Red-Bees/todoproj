import { Component, OnInit } from '@angular/core';
import { SignupComponent, Submission } from '../signup';
import { LoginComponent } from '../login';
// import { TaskListComponent } from '../taskList';
import { Task, TaskComponent } from '../task';
import { UserService, User, TokenRes, UserRes } from '../user';

@Component({
  selector: 'home',
  directives: [SignupComponent, LoginComponent, TaskComponent],
  // styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class HomeComponent {
  userService: UserService;
  user: User;
  tasks: Task[];
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  ngOnInit() {
    let colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple'
    ];
    
    this.tasks = colors.map((v) => {
      return {
        title: 'Pick up Dry Cleaning',
        desc: "Ticket #24, at Al's Drycleaning.",
        color: v,
        completed: false
      }
    });
  }
  
  setChecked(idx: number): void {
    let task = this.tasks[idx];
    this.tasks[idx].completed = !task.completed;
  }
  
  signIn(submission: Submission): void {
    // this.userService.login(submission.email, submission.password).subscribe((token: string) => {
    //   if (token) {
    //     this.userService.setToken(token);
    //     console.log('token set:', token);
    //     this.userService.getUser().subscribe((user: User) => {
    //       this.userService.setUser(user);
    //       this.tasks = user.tasks;
    //       console.log('user set:', user);
    //     });
    //   } else {
        
    //   }
    // });
    console.log('ugh');
    this.userService.login(submission.email, submission.password).subscribe((res: TokenRes) => {
      if (res.success) {
        this.retrieveUser();
      } else {
        // TODO: Implement signup dialog
      }
    });
  }
  
  private retrieveUser(): void {
    this.userService.getUser().subscribe((res: UserRes) => {
      if (res.success) {
        this.user = res.user;
        this.tasks = this.user.tasks;
      }
    })
  }
}