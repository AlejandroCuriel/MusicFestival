const { src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat')
sass.compiler = require('dart-sass');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
//rutas que compila SASS
const paths = {
    url_imagenes: 'src/img/**/*',
    url_scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function compilarSASS(){
    return src(paths.url_scss)
    .pipe( sourcemaps.init())
    .pipe(sass())
    .pipe( postcss( [autoprefixer(), cssnano()]))
    .pipe( sourcemaps.write('.'))
    .pipe(dest("./build/css"));
}

function minificarCss(){
    return src(paths.url_scss)
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(dest("./build/css"))
}

function expandirCss(){
    return src(paths.url_scss)
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(dest("./build/css"))
}
function javascript(){
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe( concat('bundle.js'))
    .pipe( terser())
    .pipe(sourcemaps.write('.'))
    .pipe( rename({ suffix: '.min'}))
    .pipe( dest('./build/js'))
}
function imagenes(){
    return src(paths.url_imagenes)
    .pipe( imagemin())
    .pipe( dest("./build/img"))
    .pipe( notify({ message: 'Imagen Minificada'}))
}

function versionWebp(){
    return src(paths.url_imagenes)
    .pipe( webp())
    .pipe( dest("./build/img"))
    .pipe( notify({ message: "Version webP lista"}))
}

function watchArchivos(){
    watch(paths.url_scss, compilarSASS); // * = La carpeta actual - ** = Todos los arcivos con esa extension
    watch(paths.js, javascript);
}

exports.compilarSASS = compilarSASS;
exports.minificarCss = minificarCss;
exports.expandirCss = expandirCss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(compilarSASS, javascript, imagenes, versionWebp, watchArchivos);