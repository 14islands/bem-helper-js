# bem-chain-js
JavaScript helper for generating BEM class names with chainable API for adding modifiers and elements.

[![Build Status](https://travis-ci.org/14islands/bem-chain-js.svg?branch=master)](https://travis-ci.org/14islands/bem-chain-js)


## Basic Usage

```javascript
import BEM from 'bem-chain-js';

assert.equal(BEM('my-block'), 'my-block');
assert.equal(BEM('my-block').el('element'), 'my-block__element');
assert.equal(BEM('my-block').is('active'), 'my-block my-block--active');
assert.equal(BEM('my-block').el('element').is('active'), 'my-block__element my-block__element--active');
```


## Conditional Modifiers

Sometimes it's useful to decide if a modifier class should be present in runtime. The `is()` function takes an optional second parameter which specifies if the class should be added.

```javascript
import BEM from 'bem-chain-js';

assert.equal(BEM('my-block'), 'my-block');
assert.equal(BEM('my-block').is('active', true), 'my-block my-block--active');
assert.equal(BEM('my-block').is('active', false), 'my-block');
```


## Usage with React

This helper was mainly developed to make it faster to write class names in JSX with React.

A common use case is to automatically generated the "Block" name from the class name:

```javascript
import BEM from 'bem-chain-js';

export class MyComponent {
  render() {
    return (
      <div className={BEM(this).is('active', this.props.active)}>
        <h1 className={BEM(this).is('title')}>
          My component title
        </h1>
      </div>
    );
  }
);
```

Assuming, `this.props.active` is `true` this will output:

```html
<div class="MyComponent MyComponent--active">
  <h1 class="MyComponent__title">My component title</h1>
</div>
```
