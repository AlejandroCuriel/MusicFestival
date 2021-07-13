const { src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('dart-sass');

function compilarSASS(){
    return src("./src/scss/app.scss")
    .pipe(sass())
    .pipe(dest("./build/css"));
}

function minificarCss(){
    return src("./src/scss/app.scss")
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(dest("./build/css"))
}

function expandirCss(){
    return src("./src/scss/app.scss")
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(dest("./build/css"))
}

function watchArchivos(){
    watch("./src/scss/**/*.scss", compilarSASS); // * = La carpeta actual - ** = Todos los arcivos con esa extension

}
exports.compilarSASS = compilarSASS
exports.minificarCss = minificarCss
exports.expandirCss = expandirCss
exports.watchArchivos = watchArchivos