import cssnano from 'cssnano'

import { config, paths } from './../config/app.config.js'
import {
  cleanFolder,
  copyAssets,
  logInfo,
  optimizeImages,
  processPug,
  processScripts,
  processStyles
} from './utilities.js'

// Production Tasks
function prodClean () {
  logInfo('Cleaning build folder for fresh start.')
  return cleanFolder(paths.build.base)
}

function prodPug () {
  return processPug(paths.build.base)
}

function prodStyles () {
  return processStyles(paths.build.css, [cssnano()])
}

function prodScripts () {
  return processScripts(paths.build.js, true)
}

function prodImages () {
  const { png, jpeg } = config.imagemin
  const pngQuality = Array.isArray(png) ? png : [0.7, 0.7]
  const jpgQuality = Number.isInteger(jpeg) ? jpeg : 70
  return optimizeImages(paths.build.img, pngQuality, jpgQuality)
}

function prodFonts () {
  return copyAssets(paths.src.fonts, paths.build.fonts)
}

function prodThirdParty () {
  return copyAssets(paths.src.thirdParty, paths.build.thirdParty)
}

function prodWebsiteFavicon () {
  return copyAssets(paths.src.favicon, paths.build.favicon, { prefix: 3 })
}

function buildFinish (done) {
  logInfo(`Production build is complete. Files are located at ${paths.build.base}`)
  done()
}

export {
  buildFinish,
  prodClean,
  prodFonts,
  prodImages,
  prodPug,
  prodScripts,
  prodStyles,
  prodThirdParty,
  prodWebsiteFavicon
}
