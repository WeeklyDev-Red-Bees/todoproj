import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
  private http: Http;
  private _user: User;
  private _token: string;
  // private _tasks: Task[];
  userEmitter: EventEmitter<User> = new EventEmitter<User>();
  tokenEmitter: EventEmitter<string> = new EventEmitter<string>();
  // tasksEmitter: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  
  constructor(http: Http) {
    this.http = http;
    
    // this.userEmitter.subscribe((user: User) => {
    //   this.tasks = user.tasks;
    // });
  }
  
  login(creds: Creds): Observable<TokenRes> {
    return this.auth(creds, true);
  }
  
  signup(creds: Creds): Observable<TokenRes> {
    return this.auth(creds, false);
  }
  
  logout(): void {
    this.token = null;
    this.user = null;
  }
  
  addTask(task: Task): Observable<UserRes> {
    return this.http.post('/api/tasks', task, this.authHeader(this.jsonHeader()))
      .map((res: Response) => {
        let body = res.json();
        if (body.success) {
          this.user = new User(<IUser>body.user);
        }
        return body;
      });
  }
  
  editTask(task: Task): Observable<UserRes> {
    return this.http.put(`/api/tasks/${task._id}`, task.getUpdate(), this.authHeader(this.jsonHeader()))
      .map((res: Response) => {
        let body = res.json();
        if (body.success) {
          this.user = new User(<IUser>body.user);
        }
        return body;
      });
  }
  
  deleteTask(task: Task): Observable<UserRes> {
    if (!task.isNew) {
      return this.http.delete(`/api/tasks/${task._id}`, this.authHeader(this.jsonHeader()))
      .map((res: Response) => {
        let body = res.json();
        // let taskIDx = this.tasks.findIndex((v: Task) => v._id === task._id);
        // if (taskIDx !== -1) this.tasks.splice(taskIDx, 1);
        if (body.success) {
          this.user = new User(<IUser>body.user);
        }
        return body;
      });
    } else {
      return null;
    }
  }
  
  private auth(creds: Creds, login: boolean): Observable<TokenRes> {
    return this.http.post(`/api/users/${login ? 'auth' : ''}`, creds, this.jsonHeader())
      .map((res: Response) => {
        let body = res.json();
        if (body.success) {
          this.token = body.token;
          this.user = new User(<IUser>body.user);
        }
        return body;
      });
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
  
  get user(): User {
    return this._user;
  }
  
  set user(v: User) {
    console.log('setting user:', v);
    this._user = v;
    this.userEmitter.emit(this._user);
  }
  
  get token(): string {
    return this._token;
  }
  
  set token(v: string) {
    console.log('setting token:', v);
    this._token = v;
    this.tokenEmitter.emit(this._token);
  }
  
  // get tasks(): Task[] {
  //   return this._tasks;
  // }
  
  // set tasks(v: Task[]) {
  //   this._tasks = v;
  //   this.tasksEmitter.emit(this._tasks);
  // }
}

export interface IUser {
  _id: string;
  email: string;
  tasks: ITask[];
}

export class User {
  _id: string;
  email: string;
  tasks: Task[];
  
  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.tasks = user.tasks.map((t: ITask) => new Task(t));
  }
}

export interface ITask {
  _id?: string;
  title: string;
  desc: string;
  color: string;
  completed: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TaskUpdate {
  title?: string;
  desc?: string;
  color?: string;
  completed?: boolean;
}

export class Task implements ITask {
  title: string;
  desc: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  private __id: string;
  private _title: string;
  private _desc: string;
  private _color: string;
  private _completed: boolean;
  
  constructor(task: ITask) {
    if (task._id) {
      this.__id = task._id;
      
    }
    this.title = task.title;
    this._title = task.title;
    this.desc = task.desc;
    this._desc = task.desc;
    this.color = task.color;
    this._color = task.color;
    this.completed = task.completed;
    this._completed = task.completed;
    this.createdAt = new Date(<string>task.createdAt);
    this.updatedAt = new Date(<string>task.updatedAt);
  }
  
  get _id(): string {
    return this.__id;
  }
  
  get isNew(): boolean {
    if (this.__id) {
      return false;
    }
    return true;
  }
  
  getUpdate(): TaskUpdate {
    let up: TaskUpdate = {};
    if (this.title !== this._title) {
      up.title = this.title;
    }
    if (this.desc !== this._desc) {
      up.desc = this.desc;
    }
    if (this.color !== this._color) {
      up.color = this.color;
    }
    if (this.completed !== this._completed) {
      up.completed = this.completed;
    }
    return up;
  }
}

export interface UserRes {
  success: boolean;
  err?: any;
  user?: User;
}

export interface TokenRes extends UserRes {
  token?: string;
}

export interface Creds {
  email: string;
  password: string;
}