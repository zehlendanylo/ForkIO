import gulp from "gulp";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import nodeSass from "sass";
const sass = gulpSass(nodeSass);
import clean from "gulp-clean";
import minifyCSS from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-uncss";
import minifyJS from "gulp-uglify"
import imageMin from "gulp-imagemin";
import BS from 'browser-sync';
const browserSync = BS.create();
const { src, dest, task, watch, series } = gulp;
const cleanFolder= () => src('dist', {read: false})
  .pipe(clean());
const convertCss = () => src('src/scss/**', { nodir: true })
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cleanCSS({
    html: ['index.html'],
    ignore: [".header__content-burgerMenu--active", ".header__navigation-call-open--active", ".header__navigation-call-close--active", ".fade-in", ".fade-out"]
  }))
  .pipe(concat('styles.min.css'))
  .pipe(minifyCSS({compatibility: 'ie8'}))
  .pipe(dest('dist/css'));
// const convertJs = () => src('src/js/script.js')
//   .pipe(concat('scripts.min.js'))
//   .pipe(minifyJS())
//   .pipe(dest('dist/js'));
const prepareImg = () => src('src/images/**/*')
  .pipe(imageMin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(dest('dist/images'));
const startWatching = () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
//   watch('src').on('all', series(convertCss, convertJs, prepareImg, browserSync.reload));
  watch('src').on('all', series(convertCss, prepareImg, browserSync.reload));
}
task('dev', startWatching);
// task('build', series(cleanFolder, convertCss, convertJs, prepareImg));
task('build', series(cleanFolder, convertCss, prepareImg));