import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /* Binding function: Returns `func` bound to `context` if `func` is a regular
   * function, otherwise (in case it's an arrow function), return `func` untouched */
  bindRegularFunc(func: (...args: any[]) => any, context: any) {
    // In case `func` is an arrow function (i.e. has no 'prototype' property) do nothing.
    if (func.toString().includes("=>")) {
      return func;
    }

    // In case `func` is a regular function, return `func` bound to `context`
    return func.bind(context);
  }

  /* Debounce function: Returns a debounced version of the callback passed as `cb`,
   * which only execute the original callback code after `wait` milliseconds has passed
   * since the last call of the debounced callback. */
  debounce(cb: (...args: any[]) => any, wait: number, context?: any) {
    let activeTimeout: ReturnType<typeof setTimeout>;
    const boundCb = this.bindRegularFunc(cb, context);

    return function(...args: any[]) {
      clearTimeout(activeTimeout);
      activeTimeout = setTimeout(() => {
        boundCb(...args);
      }, wait);
    }
  }

  /* Throttle function: Returns a throttled version of the callback passed as `cb`,
   * which only execute the original callback code after `interval` milliseconds has
   * passed regardless of how many times the throttled callback was called in between
   * intervals. */
  throttle(cb: (...args: any[]) => any, interval: number, context?: any) {
    let activeTimeout = false;
    const boundCb = this.bindRegularFunc(cb, context);

    return function(...args: any[]) {
      if (activeTimeout) return;

      activeTimeout = true;
      setTimeout(() => {
        activeTimeout = false;
        boundCb(...args);
      }, interval);
    }
  }
}