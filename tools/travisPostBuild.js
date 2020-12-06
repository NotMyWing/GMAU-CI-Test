const gulp = require('gulp');
const through = require('through2');
const mustache = require('mustache');
const zip = require('gulp-zip');

/**
 * Rewrites the version in shared.lua.
 */
function rewriteVersion(cb) {
	const rules = {
		CI_GAMEMODE_VERSION: process.env.TRAVIS_BRANCH,
		CI_WORSHOP_ID      : process.env.WORKSHOP_ID
	};

	return gulp.src('dest/**/shared.lua')
		.pipe(
			through.obj((file, _, callback) => {
				if (file.isBuffer()) {
					const rendered = mustache.render(file.contents.toString(), rules);
					file.contents = Buffer.from(rendered);
				}
				callback(null, file);
			})
		)
		.pipe(gulp.dest('dest'));
}

/**
 * Zips the dest folder.
 */
function zipGamemode() {
	return gulp.src(['dest/**/*', '!dest/*.zip'])
		.pipe(zip("gamemode.zip"))
		.pipe(gulp.dest('dest'));
}

module.exports = [
	rewriteVersion,
	zipGamemode
]
