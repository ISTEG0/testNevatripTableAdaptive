import pkg from 'gulp';

const { gulp, src, dest, parallel, series, watch } = pkg;

import browserSync from 'browser-sync';
import uglify      from 'gulp-uglify';
import cssnano     from 'gulp-cssnano';
import concat      from 'gulp-concat';
import gulpSass    from 'gulp-sass';
import dartSass    from 'sass';
const  sass        = gulpSass(dartSass);

function browsersync() {
	browserSync.init({
		server: {baseDir: './public'},
		notify: false,
		online: true,
	});
};

function scripts() {
    return src('source/js/app.js')
    .pipe(concat('main.js'))
    .pipe(dest('public/scripts/'))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('public/scripts/'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('source/styles/sass/style.scss')
    .pipe(eval(sass()))
    .pipe(concat('style.css'))
    .pipe(dest('public/css/'))
    .pipe(cssnano())
    .pipe(concat('style.min.css'))
    .pipe(dest('public/css/'))
    .pipe(browserSync.stream())
}


function startwatch() {
    watch('source/js/*.js', scripts)
    watch('source/styles/sass/**/*.scss', styles)
    watch("public/index.html").on('change', browserSync.reload);
}




export { scripts, styles };

export default series(scripts, styles, parallel(browsersync, startwatch));