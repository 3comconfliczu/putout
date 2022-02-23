# @putout/plugin-apply-try-catch [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-try-catch.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-try-catch"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply [tryCatch](https://github.com/coderaiser/try-catch).

## Install

```
npm i @putout/plugin-apply-try-catch
```

## Rule

```json
{
    "rules": {
        "apply-try-catch/try-catch": "on",
        "apply-try-catch/try-to-catch": "on",
        "apply-try-catch/await": "on"
    }
}
```

## tryCatch

### ❌ Example of incorrect code

```js
import tryCatch from 'try-catch';
const [error] = tryCatch(log, 'hello');
```

### ✅ Example of correct code

```js
const [error] = tryCatch(log, 'hello');
```

## tryToCatch

### ❌ Example of incorrect code

```js
import tryCatch from 'try-catch';
const [error] = await tryToCatch(send, 'hello');
```

### ✅ Example of correct code

```js
const [error] = await tryToCatch(log, 'hello');
```

## await

### ❌ Example of incorrect code

```js
await tryToCatch(a, b);
await tryToCatch(a, b);
```

### ✅ Example of correct code

```js
await tryToCatch(a, b);
```

## License

MIT
