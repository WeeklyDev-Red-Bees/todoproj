/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with typings

typings install dt~node --save --global

 * If you can't find the type definition in the registry we can make an ambient definition in
 * this file for now. For example

 declare module "my-module" {
   export function doesSomething(value: string): string;
 }

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

declare var assert: any;
declare var _: any;
declare var $: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 *

import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the typings registry
 * see https://github.com/typings/registry
 *
 */


// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var HMR: boolean;

interface GlobalEnvironment {
  ENV;
  HMR;
}

interface Es6PromiseLoader {
  (id: string): () => Promise<any>;
}

type AsyncRoutes = {[component: string]: Es6PromiseLoader};


interface WebpackModule {
  hot: {
    data?: any,
    idle: any,
    accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
    decline(dependencies?: string | string[]): void;
    dispose(callback?: (data?: any) => void): void;
    addDisposeHandler(callback?: (data?: any) => void): void;
    removeDisposeHandler(callback?: (data?: any) => void): void;
    check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    status(callback?: (status?: string) => void): void | string;
    removeStatusHandler(callback?: (status?: string) => void): void;
  };
}

interface WebpackRequire {
  context(file: string, flag?: boolean, exp?: RegExp): any;
}


interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}



// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeRequireFunction extends Es6PromiseLoader  {}
interface NodeModule extends WebpackModule {}
interface Global extends GlobalEnvironment  {}

declare module __NodeUUID {
  interface V1Options {
    node: any[];
    clockSeq: number;
    msecs: number | Date;
    nsecs: number;
  }
  
  interface RNGFunction {
    (): number[];
  }
  
  interface V4Options {
    random: number[];
    rng: RNGFunction;
  }
  
  interface UUID {
    v1(options?: V1Options): string;
        v1(options?: V1Options, buffer?: number[], offset?: number): number[];
        v1(options?: V1Options, buffer?: Buffer, offset?: number): Buffer;

        v4(options?: V4Options): string;
        v4(options?: V4Options, buffer?: number[], offset?: number): number[];
        v4(options?: V4Options, buffer?: Buffer, offset?: number): Buffer;

        parse(id: string, buffer?: number[], offset?: number): number[];
        parse(id: string, buffer?: Buffer, offset?: number): Buffer;

        unparse(buffer: number[], offset?: number): string;
        unparse(buffer: Buffer, offset?: number): string;
  }
}