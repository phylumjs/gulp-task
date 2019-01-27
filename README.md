# Gulp Task
[![Coverage Status](https://coveralls.io/repos/github/phylumjs/gulp-task/badge.svg?branch=master)](https://coveralls.io/github/phylumjs/gulp-task?branch=master)
[![Build Status](https://travis-ci.com/phylumjs/gulp-task.svg?branch=master)](https://travis-ci.com/phylumjs/gulp-task)
[![Version](https://img.shields.io/npm/v/@phylum/gulp-task.svg) ![License](https://img.shields.io/npm/l/@phylum/gulp-task.svg)](https://npmjs.org/package/@phylum/gulp-task)

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
