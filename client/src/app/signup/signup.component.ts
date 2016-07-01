import { Component, Output, EventEmitter } from '@angular/core';
import { UserService, TokenRes, User, UserRes } from '../user';

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
  userService: UserService;
  // model: Submission = {
  //   email: "",
  //   password: ""
  // };
  private _email: string = "";
  private _pass: string = "";
  private _passConfirm: string = "";
  
  signUpMode: boolean = false;
  
  canSubmit: boolean = true;
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  // submitClick() {
  //   this.onSignup.emit(this.model);
  // }
  
  signIn() {
    this.userService.login(this.email, this.pass).subscribe((tokenRes: TokenRes) => {
      console.log('login token res:', tokenRes);
      if (tokenRes.success) {
        this.userService.getUser().subscribe((userRes: UserRes) => {
          console.log('user res:', userRes);
        });
      } else {
        // console.log(tokenRes);
        // this.signUpMode = true;
        if (tokenRes.err === "ENOTEXIST") {
          this.signUpMode = true;
        }
      }
    });
  }
  
  signUp() {
    
  }
  
  cancelSignUp() {
    this.signUpMode = false;
  }
  
  canSubmitCheck() {
    if (!this.email) {
      this.canSubmit = false;
      return;
    }
    if (!this.pass) {
      this.canSubmit = false;
      return;
    }
    if (this.signUpMode) {
      if (this.pass !== this.passConfirm) {
        this.canSubmit = false;
        return;
      }
    }
    this.canSubmit = true;
  }
  
  get email(): string {
    return this._email;
  }
  get pass(): string {
    return this._pass;
  }
  get passConfirm(): string {
    return this._passConfirm;
  }
  
  set email(v: string) {
    this._email = v;
    this.canSubmitCheck();
  }
  
  set pass(v: string) {
    this._pass = v;
    this.canSubmitCheck();
  }
  
  set passConfirm(v: string) {
    this._passConfirm = v;
    this.canSubmitCheck();
  }
}