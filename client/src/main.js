import { bootstrap } from '@angular/platform-browser-dynamic';

import { provide } from '@angular/core';

import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';

import { App } from './app';

export function main() {
  return bootstrap(App, [
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS
  ])
  .then(decorateComponentRef)
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => main());