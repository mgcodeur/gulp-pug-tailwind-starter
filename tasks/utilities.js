import { src, dest } from 'gulp'
import autoprefixer from 'autoprefixer'
import clean from 'gulp-clean'
import concat from 'gulp-concat'
import gulpCopy from 'gulp-copy'
import gulpSass from 'gulp-sass'
import imagemin, { mozjpeg } from 'gulp-imagemin'
import logSymbols from 'log-symbols'
import pngquant from 'imagemin-pngquant'
import postcss from 'gulp-postcss'
import pug from 'gulp-pug'
import sassCompiler from 'sass'
import tailwindcss from 'tailwindcss'
import uglify from 'gulp-terser'

import { config, paths } from './../config/app.config.js'

const sass = gulpSass(sassCompiler)

const logInfo = (message) => console.log(`\n${logSymbols.info} ${message}\n`)

const cleanFolder = (path) =>
  src(path, { read: false, allowEmpty: true }).pipe(clean())

const processPug = (destPath, pretty = true) =>
  src([
    `${paths.src.base}/**/*.pug`,
    `!${paths.src.base}/includes/**/*`,
    `!${paths.src.base}/layouts/**/*`
  ])
    .pipe(pug({ pretty }))
    .pipe(dest(destPath))

const processStyles = (destPath, plugins = []) =>
  src(`${paths.src.css}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([tailwindcss(config.tailwindjs), autoprefixer(), ...plugins]))
    .pipe(concat('app.css'))
    .pipe(dest(destPath))

const processScripts = (destPath, minify = false) => {
  let stream = src([
    `${paths.src.js}/libs/**/*.js`,
    `${paths.src.js}/**/*.js`,
    `!${paths.src.js}/**/external/*`
  ])
    .pipe(concat('app.js'))

  if (minify) {
    stream = stream.pipe(uglify())
  }

  return stream.pipe(dest(destPath))
}

const copyAssets = (srcPath, destPath, options = {}) =>
  src(`${srcPath}/**/*`).pipe(gulpCopy(destPath, options))

const optimizeImages = (destPath, pngQuality = [0.7, 0.7], jpgQuality = 70) => {
  const plugins = [
    pngquant({ quality: pngQuality }),
    mozjpeg({ quality: jpgQuality })
  ]

  return src(`${paths.src.img}/**/*`)
    .pipe(imagemin(plugins))
    .pipe(dest(destPath))
}

export {
  cleanFolder,
  copyAssets,
  logInfo,
  optimizeImages,
  processPug,
  processScripts,
  processStyles
}
