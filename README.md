# Ember Invoke

EmberJS helper to invoke methods on a given context such as components or controllers.

## Installation

`ember install ember-invoke`

## Usage
```hbs
{{invoke this 'methodName' 'any' 'number' 'of' 'args'}}

{{!-- OR --}}

{{some-component prop=(invoke this 'methodName' 'any' 'number' 'of' 'args')}}
```

## Why?

```js
// component/restaurant.js
import Component from '@ember/component';

export default Component.extend({
  people: [{
    first: 'Bob',
    last: 'Smith',
    age: 43
  }, {
    first: 'Jen',
    last: 'Doe',
    age: 19
  }, {
    first: 'Bill',
    last: 'Foobar'
    age: 74
  }],

  canDrink(age) {
    return age >= 21;
  }
})
```

```hbs
{{!-- templates/component/restaurant.hbs --}}
{{#each people as |person|}}

  <h5>{{person.first}} {{person.last}}</h5>

  {{!--
    The only way you could make this work would be to create a
    `can-drink` helper that you would call like so:

    (can-drink person.age)
    
    However, that logic might not make sense outside of the scope of
    this component. Also, many times the logic is simple (like in this
    example) and creating a whole separate helper file is over kill.
    
    Also note that a computed property wouldn't work as we are within an 
    iteration and cannot create a cp that is bound to an individual item. 
    Instead we would have to create a wrapper cp that adds on these extra
    properties which may or may not be what you want.

    This is where the invoke helper comes in. Now you can simply `invoke`
    any method on a given context and it will be called with the arguments
    that are passed in.
  --}}

  {{#if (invoke this 'canDrink' person.age)}}
    <p>is of legal drinking age</p>
  {{else}}
    <p>is <b>NOT</b> of legal drinking age</p>
  {{/if}}
{{/each}}
```
