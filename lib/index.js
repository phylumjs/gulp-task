'use strict'

const asyncDone = require('async-done')
const gulp = require('gulp')
const lastRun = require('last-run')

module.exports = (fn, options = {}) => {
	return ctx => new Promise((resolve, reject) => {
		if (typeof fn === 'string') {
			const name = fn
			fn = gulp.registry().get(name)
			if (typeof fn !== 'function') {
				throw new Error(`Unable to find gulp task: "${name}"`)
			}
		}
		asyncDone(options.context ? done => fn(done, ctx) : fn, (err, result) => {
			if (err) {
				lastRun.release(fn)
				reject(err)
			} else {
				lastRun.capture(fn)
				resolve(result)
			}
		})
	})
}
