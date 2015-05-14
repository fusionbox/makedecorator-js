export default function makeDecorator(fn) {
  return function(target, prop, descriptor) {
    if (typeof descriptor !== 'undefined') {
      descriptor.value = fn(descriptor.value);
      return descriptor;
    }
    return fn(target);
  };
}
