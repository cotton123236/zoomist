# create-banner

[![Build Status](https://img.shields.io/github/workflow/status/fengyuanchen/create-banner/ci/main.svg)](https://github.com/fengyuanchen/create-banner/actions) [![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/create-banner.svg)](https://codecov.io/gh/fengyuanchen/create-banner) [![Downloads](https://img.shields.io/npm/dm/create-banner.svg)](https://www.npmjs.com/package/create-banner) [![Version](https://img.shields.io/npm/v/create-banner.svg)](https://www.npmjs.com/package/create-banner)

> Create a banner from a package.json file.

## Main files

```text
/
├── index.js         (CommonJS, default)
├── index.esm.js     (ECMAScript Module)
└── index.d.ts       (TypeScript Declaration File)
```

## Install

```shell
npm install --save-dev create-banner
```

## Usage

### Syntax

```js
createBanner(options);
```

- **Arguments**:
  - `options` (optional):
    - Type: `Object`
    - The [options](#options) for creating banner.
- **Returns**:
  - Type: `string`
  - Return the created banner.

### Examples

```js
import createBanner from 'create-banner';

createBanner();
/*!
 * create-banner v1.0.0
 * https://github.com/fengyuanchen/create-banner
 *
 * Copyright 2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-05-19T09:18:34.739Z
 */

createBanner({ case: 'camelCase', template: 'simple' });
/*!
 * createBanner v1.0.0
 * Copyright 2018 Chen Fengyuan
 * Released under the MIT license
 */

createBanner({ case: 'Title Case', template: 'inline' });
/*! Create Banner v1.0.0 | (c) 2018 Chen Fengyuan | MIT */
```

## Options

### case

- Type: `String`
- Default: `''`
- Options:
  - `'camel-case'` (camelCase)
  - `'capital-case'` (Capital Case)
  - `'constant-case'` (CONSTANT_CASE)
  - `'dot-case'` (dot.case)
  - `'header-case'` (Header-Case)
  - `'no-case'` (no-case)
  - `'param-case'` (param-case)
  - `'pascal-case'` (PascalCase)
  - `'path-case'` (path/case)
  - `'sentence-case'` (Sentence case)
  - `'snake-case'` (snake_case)
  - All the case functions supported by the [change-case](https://www.npmjs.com/package/change-case) package.

The case of the package name in the banner. Not to change the package name case by default.

### data

- Type: `Object`
- Default:

  ```js
  {
    date: new Date().toISOString(),
    year: new Date().getFullYear(),
  }
  ```

The extra data for creating banner, will be merged into package data.

```js
createBanner({
  data: {
    name: 'Library.js',
    year: '2018-present',
  },
});
```

### pkg

- Type: `Object`
- Default: `undefined`

The package data for creating banner. If it is undefined, will read from the closest `package.json` file by default using the [read-pkg-up](https://www.npmjs.com/package/read-pkg-up) package.

### template

- Type: `String`
- Default: `'normal'`
- Options:
  - `'normal'`:

    ```js
    /*!
     * @name v@version
     * @homepage
     *
     * Copyright @year @author.name
     * Released under the @license license
     *
     * Date: @date
     */
    ```

  - `'simple'`:

    ```js
    /*!
     * @name v@version
     * Copyright @year @author.name
     * Released under the @license license
     */
    ```

  - `'inline'`:

    ```js
    /*! @name v@version | (c) @year @author.name | @license */
    ```

  - Other values will be used directly as a custom template.

The template for creating banner. Property using a dot path is supported by the [dot-prop](https://www.npmjs.com/package/dot-prop) package.

Example for custom template:

```js
createBanner({
  template: `/*!
 * @name v@version
 * @license (c) @author.name
 */
`,
});
/*!
 * create-banner v1.0.0
 * MIT (c) Chen Fengyuan
 */
```

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com/)
