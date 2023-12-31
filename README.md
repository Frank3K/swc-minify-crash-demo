# SWC crash during minification with sourcemaps

This repository serves as a demonstration of a bug in swc. When attempting to minify specific input accompanied by a source map, the following error is triggered:

```
[Error: invalid type: map, expected a string at line 1 column 3155233] {
  code: 'InvalidArg'
}
```

## Reproduction

### Configuration

node version: 18 (v18.15.0 was used while creating this repository)
swc version: 1.3.100
terser version: 5.24.0

### Preparation

Run `yarn` to setup the crash demo.

### swc

To replicate the issue, run the following command:

```sh
node swc.mjs
```

Observe that the application crashses with the following error: `Error: invalid type: map, expected a string at line 1 column 3155233`.

#### Without sourcemaps

Please note that minifying without sourcemaps does work. This can be validated by commenting out the `options` in [swc.mjs](./swc.mjs).

### terser

To compare, run the following command:

```sh
node terser.mjs
```

Observe that the application runs successfully, logging code and a source map without any issues.

## Input

The input was generated by creating a new [ember.js](https://emberjs.com/) application using the command ember new <appname>.

node version: 18
ember-cli version: 5.4.1

#### ember-cli-build.js

The ember-cli-build.js configuration file that was used includes the following:

```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },

    // Add options here
    'ember-cli-terser': {
      enabled: true,
    },
  });

  return app.toTree();
};
```
