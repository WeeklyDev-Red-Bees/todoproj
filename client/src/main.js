import { bootstrap } from '@angular/platform-browser-dynamic';

import { provide } from '@angular/core';

import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';

import { App } from './app';

let tasks = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
].map((v) => {
  return {
    title: 'Pick up Dry Cleaning',
    desc: "Ticket #24, at Al's Drycleaning.",
    color: v,
    completed: false
  }
});

export function main() {
  return bootstrap(App, [
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    { provide: 'TASKS', useValue: tasks }
  ])
  .then(decorateComponentRef)
  .catch(err => console.error(err));
}
// main();
document.addEventListener('DOMContentLoaded', () => main());