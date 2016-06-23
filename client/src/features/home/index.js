import uirouter from 'angular-ui-router';

import routes from './home.routes';
import HomeController from './home.controller';

console.log(routes);
// console.log(angular);

export default angular.module('app.home', [uirouter])
  .config(routes)
  .controller('HomeController', HomeController)
  .name;