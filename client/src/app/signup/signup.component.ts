import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppService, TokenRes, User, UserRes, Creds } from '../app.service';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'signup',
  directives: [MODAL_DIRECTIVES],
  // styles: [ require('./signup.scss') ],
  template: require('./signup.html')
})
export class SignupComponent {
  
  @Output() onSignup: EventEmitter<Creds> = new EventEmitter<Creds>();
  appService: AppService;
  // model: Submission = {
  //   email: "",
  //   password: ""
  // };
  private _email: string = "";
  private _pass: string = "";
  private _passConfirm: string = "";
  
  signUpMode: boolean = false;
  
  canSubmit: boolean = true;
  
  constructor(appService: AppService) {
    this.appService = appService;
  }
  
  // submitClick() {
  //   this.onSignup.emit(this.model);
  // }
  
  signIn() {
    let creds: Creds = {
      email: this.email,
      password: this.pass
    };
    this.appService.login(creds).subscribe((tokenRes: TokenRes) => {
      console.log('login token res:', tokenRes);
      if (tokenRes.success) {
        // this.appService.getUser().subscribe((userRes: UserRes) => {
        //   console.log('user res:', userRes);
        // });
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
    let creds: Creds = {
      email: this.email,
      password: this.pass
    };
    this.appService.signup(creds).subscribe((tokenRes: TokenRes) => {
      console.log('signup token res:', tokenRes);
      if (tokenRes.success) {
        console.log('yay');
      } else {
        console.log(':(');
      }
    })
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