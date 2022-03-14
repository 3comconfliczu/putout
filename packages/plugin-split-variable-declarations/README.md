# @putout/plugin-split-variable-declarations [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-variable-declarations "npm"

> - The [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) statement declares a block-scoped local variable, optionally initializing it to a value.
> - [Constants](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) are block-scoped, much like variables declared using the `let` keyword. The value of a constant can't be changed through reassignment (i.e. by using the assignment operator), and it can't be redeclared (i.e. through a variable declaration). However, if a constant is an **object** or **array** its properties or items can be updated or removed.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and split variable declarations.

## Install

```
npm i @putout/plugin-split-variable-declarations
```

## Rule

```json
{
    "rules": {
        "split-variable-declarations": "on"
    }
}
```

## ❌ Example of incorrect code

```js
let a, b;
```

## ✅ Example of correct code

```js
let a;
let b;
```

## License

MIT
