import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../task';

export interface User {
  _id: string;
  email: string;
  tasks: [Task];
}

@Injectable()
export class UserService {
  private http: Http;
  user: User;
  token: string;
  constructor(http: Http) {
    this.http = http;
  }
  
  login(email: string, password: string): Observable<string> {
    if (this.token) {
      throw new Error("User has already been logged in.");
    }
    return this.http.post("/api/users/auth", { email, password}, this.jsonHeader())
      .map((res: Response) => {
        let body = res.json();
        if (body.success) {
          return body.token;
        }
      });
  }
  
  getUser(): Observable<User> {
    if (!this.token) {
      throw new Error("User has not signed in.");
    }
    return this.http.get('/api/users/', this.authHeader())
      .map((res: Response) => {
        let body = res.json();
        if (body.success) {
          return body.user;
        }
      });
  }
  
  setToken(token: string): void {
    this.token = token;
  }
  
  setUser(user: User): void {
    this.user = user;
  }
  
  logout(): void {
    this.token = null;
    this.user = null;
  }
  
  private authHeader(reqOpts?: RequestOptions): RequestOptions {
    if (reqOpts) {
      reqOpts.headers.append('X-Access-Token', this.token);
    } else {
      reqOpts = new RequestOptions({
        headers: new Headers({ 'X-Access-Token': this.token })
      });
    }
    return reqOpts;
  }
  
  private jsonHeader(reqOpts?: RequestOptions): RequestOptions {
    if (reqOpts) {
      reqOpts.headers.append('Content-Type', 'application/json');
    } else {
      reqOpts = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
      });
    }
    return reqOpts;
  }
}