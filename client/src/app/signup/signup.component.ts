import { Component, Output, EventEmitter } from '@angular/core';

export interface Submission {
  email: string;
  password: string;
}

@Component({
  selector: 'signup',
  // styles: [ require('./signup.scss') ],
  template: require('./signup.html')
})
export class SignupComponent {
  @Output() onSignup: EventEmitter<Submission> = new EventEmitter<Submission>();
  
  model: Submission = {
    email: "",
    password: ""
  };
  
  canSubmit: boolean = false;
  
  constructor() {
    
  }
  
  // setEmail(email: string): void {
  //   this.email = email;
  //   console.log('set email to:', this.email);
  // }
  
  // setPass(pass: string): void {
  //   this.password = pass;
  //   console.log('set pass to:', this.password);
  // }
  
  // checkSubmit() {
  //   if (this.email && this.password) {
  //     this.canSubmit = true;
  //   } else {
  //     this.canSubmit = false;
  //   }
  //   console.log('set canSubmit to:', this.canSubmit);
  // }
  
  submitClick() {
    this.onSignup.emit(this.model);
  }
}