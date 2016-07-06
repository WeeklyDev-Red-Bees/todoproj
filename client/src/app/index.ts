// App
export * from './app.component';
export * from './app.service';

import { AppService } from './app.service';
import { EditTaskService } from './editTask';
// import { UserService } from './user';

// Application wide providers
export const APP_PROVIDERS = [
  AppService,
  EditTaskService
  // UserService
];
