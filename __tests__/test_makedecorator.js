jest.dontMock('../src/makedecorator.js');

describe('makedecorator', function() {

  it('should decorate class method', function() {
    let makeDecorator = require('../src/makedecorator.js')
      , yell = function(fn) {
          return function() {
            return fn.apply(this, arguments) + '!';
          };
        };

    class MyClass {
      @makeDecorator(yell)
      greet() {
        return 'Hello';
      }
      @makeDecorator(yell)
      introduce(name1, name2) {
        return `${name1}, meet ${name2}`;
      }
    }

    expect((new MyClass()).greet()).toBe('Hello!');
    expect((new MyClass()).introduce('Bob', 'Alice')).toBe('Bob, meet Alice!');
  });

  it('should wrap class method', function() {
    let makeDecorator = require('../src/makedecorator.js')
      , yell = function(fn) {
          return function() {
            return fn.apply(this, arguments) + '!';
          };
        };

    class MyClass {
      greet() {
        return 'Hello';
      }
      introduce(name1, name2) {
        return `${name1}, meet ${name2}`;
      }
    }

    let instance = new MyClass();
    instance.greet = makeDecorator(yell)(instance.greet);
    instance.introduce = makeDecorator(yell)(instance.introduce);

    expect(instance.greet()).toBe('Hello!');
    expect(instance.introduce('Bob', 'Alice')).toBe('Bob, meet Alice!');
  });
});
