# makedecorator-js

Wraps a function-wrapping function and returns an ES7 decorator capable of decorating an ES6 class method.

## Installation

    npm install --save makedecorator

## Why?

ES7 Decorators employ the same function signature as `Object.defineProperty`, `function(obj, prop, descriptor)`. You probably don't need to be concerned about that in most cases where you'd simply like to wrap a class method with an existing function.

## Example

```javascript
var makeDecorator = require('makedecorator')

function yell(fn) {
  return function() {
    return fn.apply(this, arguments) + '!';
  };
};

let yellDecorator = makeDecorator(yell);


// Use with function.
function greet() {
  return 'Hello';
}

yellDecorator(greet)();
// returns 'Hello!'


// Declarative use in class design.
class MyClass {
  @yellDecorator
  greet() {
    return 'Hello';
  }
}

let instance = new MyClass();
instance.greet();
// returns 'Hello!'
```

## How to build

To compile:

    npm run compile

To release to npm:

    npm version patch
    npm publish

