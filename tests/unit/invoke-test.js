import { module, test } from 'qunit';
import { invokeFunction } from 'ember-invoke/helpers/invoke';

module('Unit | Invoke Helper');

test('should update foo on testMethod', function(assert) {
  const context = {
    func(...args) {
      return args.join('-');
    }
  };

  assert.equal(invokeFunction([context, 'func', 'hello']), 'hello');
  assert.equal(invokeFunction([context, 'func', 'hello', 'world']), 'hello-world');
  assert.equal(invokeFunction([context, 'func']), '');

  assert.throws(() => invokeFunction([context, 'bar']), `Method 'bar' is not defined or cannot be invoked`);
  assert.throws(() => invokeFunction([null, 'func']), `Method 'func' is not defined or cannot be invoked`);
});
