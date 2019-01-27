# Gulp Task
Allows embedding gulp tasks as pipeline tasks.

## Installation
```bash
npm i @phylum/gulp-task gulp
```

## Usage
This package exposes a function for wrapping a gulp task into a pipeline task.<br>
```js
const wrap = require('@phylum/gulp-task')

const task = wrap(fn[, options])

async function example(ctx) {
	await ctx.use(task)
}
```
+ fn `<function> | <string>` - The gulp task function or the name of a registered gulp task.
+ options `<object>` - Optional. An object with options explained below.
+ returns `<function>` - The pipeline task.

### `options.context`
The task context can be accessed from within the gulp task using the `context` option.
```js
const task = wrap((done, ctx) => {
	// Gulp task code...
}, {context: true})
```
