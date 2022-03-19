# @putout/plugin-convert-for-in-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-in-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-in-to-for-of "npm"

> The [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) statement iterates over all enumerable properties of an object that are keyed by strings.
>
> The [`for...of`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop iterating over iterable objects.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `for...in` to `for...of` loop.

## Install

```
npm i @putout/plugin-convert-for-in-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-for-in-to-for-of/positive": "on",
        "convert-for-in-to-for-of/negative": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const item in object) {
    if (object.hasOwnProperty(item)) {
        log(item);
    }
}

for (const item in object) {
    if (!object.hasOwnProperty(item))
        continue;
    
    log(item);
}
```

## ✅ Example of correct code

```js
for (const item of Object.keys(object)) {
    log(item);
}
```

## License

MIT
