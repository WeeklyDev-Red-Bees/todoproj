import './app.scss';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import FEATURES from '../features';

angular.module('app', [
  uirouter,
  ...FEATURES
]).config(routing);

console.log(angular);