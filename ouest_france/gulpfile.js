
const
    gulp       = require('gulp'),
    sassLint   = require('gulp-sass-lint'),
    eslint     = require('gulp-eslint');

const inputPaths = {
    javascript: [
        '.eslintrc.json',
        'webpack.config.js',
        'gulpfile.js',
        'public/js/**/*.js',
    ],
    sass: ['public/sass/**/*.scss', 'public/sass/**/**/*.scss'],
};

gulp.task('js:lint', () => {
    // http://eslint.org/docs/rules
    let task = gulp
        .src(inputPaths.javascript)
        .pipe(eslint())
        .pipe(eslint.format());

    if (process.env.CI) {
        task = task.pipe(eslint.failAfterError());
    }

    return task;
});

gulp.task('js:watch', () => {
    gulp.watch(inputPaths.javascript, [
        'js:lint',
    ]);
});

/**
 * SASS
 */

gulp.task('sass:lint', () => {
    gulp.src(inputPaths.sass)
        .pipe(sassLint({
            configFile: './.sass-lint.yml',
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('sass:watch', () => {
    gulp.watch(inputPaths.sass, [
        'sass:lint',
    ]);
});

/**
 * Main tasks
 */

gulp.task('watch', ['js:watch', 'sass:watch']);
gulp.task('lint', ['js:lint', 'sass:lint']);
gulp.task('default', ['lint', 'watch']);

