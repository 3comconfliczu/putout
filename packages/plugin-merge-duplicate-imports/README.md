# @putout/plugin-merge-duplicate-imports [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-imports.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-duplicate-imports "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove duplecate keys.

## Install

```
npm i @putout/plugin-merge-duplicate-imports
```

## Rule

```json
{
    "rules": {
        "merge-duplicate-imports": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import {m as b} from 'y';
import {z} from 'y';
import x from 'y';
```

## ✅ Example of correct code

```js
import x, {
    m as b,
    z,
} from 'y';
```

## License

MIT
