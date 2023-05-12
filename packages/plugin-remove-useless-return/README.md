# @putout/plugin-remove-useless-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-return"npm"

> The `return` statement ends function execution and specifies a value to be returned to the function caller.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `return`.

## Install

```
npm i @putout/plugin-remove-useless-return
```

## Rule

```json
{
    "rules": {
        "remove-useless-return": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const traverse = ({push}) => {
    return {
        ObjectExpression(path) {
            push(path);
        },
    };
};
```

## ✅ Example of correct code

```js
const traverse = ({push}) => ({
    ObjectExpression(path) {
        push(path);
    },
});
```

## License

MIT
