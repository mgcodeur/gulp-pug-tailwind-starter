import browserSync from 'browser-sync'
import { watch, series } from 'gulp'

import { config, paths } from './../config/app.config.js'
import {
  cleanFolder,
  copyAssets,
  logInfo,
  processPug,
  processScripts,
  processStyles
} from './utilities.js'

const browser = browserSync.create()

function devClean () {
  logInfo('Cleaning dist folder for fresh start.')
  return cleanFolder(paths.dist.base)
}

function devPug () {
  return processPug(paths.dist.base)
}

function devStyles () {
  return processStyles(paths.dist.css)
}

function devScripts () {
  return processScripts(paths.dist.js)
}

function devImages () {
  return copyAssets(paths.src.img, paths.dist.img)
}

function devFonts () {
  return copyAssets(paths.src.fonts, paths.dist.fonts)
}

function devThirdParty () {
  return copyAssets(paths.src.thirdParty, paths.dist.thirdParty)
}

function devWebsiteFavicon () {
  return copyAssets(paths.src.favicon, paths.dist.favicon, { prefix: 3 })
}

function livePreview (done) {
  browser.init({
    server: { baseDir: paths.dist.base },
    port: config.port || 5000
  })
  done()
}

function previewReload (done) {
  logInfo('Reloading Browser Preview.')
  browser.reload()
  done()
}

function watchFiles () {
  logInfo('Watching for Changes..')
  watch([config.tailwindjs, `${paths.src.css}/**/*.scss`], series(devStyles, previewReload))
  watch(`${paths.src.base}/**/*.{html,pug}`, series(devStyles, devPug, previewReload))
  watch(`${paths.src.js}/**/*.js`, series(devScripts, previewReload))
  watch(`${paths.src.img}/**/*`, series(devImages, previewReload))
  watch(`${paths.src.fonts}/**/*`, series(devFonts, previewReload))
  watch(`${paths.src.thirdParty}/**/*`, series(devThirdParty, previewReload))
  watch(`${paths.src.favicon}/**/*`, series(devWebsiteFavicon, previewReload))
}

export {
  devClean,
  devFonts,
  devImages,
  devPug,
  devScripts,
  devStyles,
  devThirdParty,
  devWebsiteFavicon,
  livePreview,
  previewReload,
  watchFiles
}
