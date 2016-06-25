import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

let PROVIDERS = [
  
];

let _decorateComponentRef = function identity(value) { return value; };

// if ('production' === ENV) {
if (false) {
  disableDebugTools();
  enableProdMode();
  
  PROVIDERS = [
    ...PROVIDERS
    // Custom production providers
  ];
} else {
  _decorateComponentRef = (cmpRef) => enableDebugTools(cmpRef);
  
  PROVIDERS = [
    ...PROVIDERS,
    // Custom development providers
  ];
}

export const decorateComponentRef = _decorateComponentRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];