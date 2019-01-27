'use strict'

const test = require('ava')
const gulp = require('gulp')
const {Pipeline, Context} = require('@phylum/pipeline')
const wrap = require('..')

test('basic usage', async t => {
	let completed = false
	const pipeline = new Pipeline(async ctx => {
		t.is(await ctx.use(wrap(callback => {
			setImmediate(() => {
				completed = true
				callback(null, 'foo')
			})
		})), 'foo')
	})
	const promise = pipeline.enable()
	t.false(completed)
	await promise
	t.true(completed)
})

test('context access', async t => {
	const pipeline = new Pipeline(async ctx => {
		await ctx.use(wrap((callback, ctx2) => {
			t.true(ctx2 instanceof Context)
			t.true(ctx2.isDependent(ctx))
			callback()
		}, {context: true}))
	})
	await pipeline.enable()
})

test('reject', async t => {
	const pipeline = new Pipeline(async ctx => {
		await ctx.use(wrap(callback => {
			callback(new Error('foo'))
		}))
	})
	const err = await t.throwsAsync(pipeline.enable())
	t.is(err.message, 'foo')
})

test('named task', async t => {
	gulp.task('test-named-task', callback => {
		callback(null, 'foo')
	})
	const pipeline = new Pipeline(async ctx => {
		t.is(await ctx.use(wrap('test-named-task')), 'foo')
	})
	await pipeline.enable()
})

test('named task (not found)', async t => {
	const pipeline = new Pipeline(async ctx => {
		const wrapped = wrap('test-named-task-not-found')
		await t.throwsAsync(ctx.use(wrapped))
	})
	await pipeline.enable()
})

test('capture last run', async t => {
	function reject(callback) {
		callback(new Error('foo'))
	}
	function resolve(callback) {
		callback()
	}
	const pipeline = new Pipeline(async ctx => {
		await t.throwsAsync(ctx.use(wrap(reject)))
		await ctx.use(wrap(resolve))
	})
	t.is(gulp.lastRun(reject), undefined)
	t.is(gulp.lastRun(resolve), undefined)
	await pipeline.enable()
	t.is(gulp.lastRun(reject), undefined)
	t.is(typeof gulp.lastRun(resolve), 'number')
})
