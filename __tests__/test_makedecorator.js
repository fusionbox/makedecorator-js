jest.dontMock('../src/makedecorator.js');

describe('makedecorator', function() {

  it('should decorate class method', function() {
    let makeDecorator = require('../src/makedecorator.js')
      , yell = function(fn) {
          return function() {
            return fn.apply(this, arguments) + '!';
          };
        }
      , yellDecorator = makeDecorator(yell);

    class MyClass {
      @yellDecorator
      greet() {
        return 'Hello';
      }
      @yellDecorator
      introduce(name1, name2) {
        return `${name1}, meet ${name2}`;
      }
    }

    expect((new MyClass()).greet()).toBe('Hello!');
    expect((new MyClass()).introduce('Bob', 'Alice')).toBe('Bob, meet Alice!');
  });

  it('should wrap function', function() {
    let makeDecorator = require('../src/makedecorator.js')
      , yell = function(fn) {
          return function() {
            return fn.apply(this, arguments) + '!';
          };
        }
      , yellDecorator = makeDecorator(yell);

    function greet() {
      return 'Hello';
    }

    function introduce(name1, name2) {
      return `${name1}, meet ${name2}`;
    }

    expect(yellDecorator(greet)()).toBe('Hello!');
    expect(yellDecorator(introduce)('Bob', 'Alice')).toBe('Bob, meet Alice!');
  });
});
