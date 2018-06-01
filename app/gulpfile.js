let gulp = require('gulp');
let concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
let replace = require('gulp-replace')

let imagemin = require('gulp-imagemin')

const fs = require('fs')


gulp.task('styles', function () {

    let _css = fs.readdirSync('./src/assets/css/')

    _css.forEach(file => {

        gulp.src(['./src/assets/base.css', `./src/assets/css/${file}`])
            .pipe(concat(file))
            .pipe(replace('../images/', './images/'))
            .pipe(cleanCSS())
            .pipe(gulp.dest(`./static`))
    })
})

gulp.task('images', function () { 
    gulp.src('./src/assets/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./static/images'))
 })

gulp.task('default', ['styles', 'images'])
