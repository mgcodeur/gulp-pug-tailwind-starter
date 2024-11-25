import { series, parallel } from 'gulp'

import {
  devClean,
  devFonts,
  devImages,
  devPug,
  devScripts,
  devStyles,
  devThirdParty,
  devWebsiteFavicon,
  livePreview,
  watchFiles
} from './tasks/dev.js'
import {
  prodClean,
  prodFonts,
  prodImages,
  prodPug,
  prodScripts,
  prodStyles,
  prodThirdParty,
  prodWebsiteFavicon,
  buildFinish
} from './tasks/prod.js'

export default series(
  devClean,
  parallel(
    devStyles,
    devScripts,
    devImages,
    devFonts,
    devThirdParty,
    devPug,
    devWebsiteFavicon
  ),
  livePreview,
  watchFiles
)

export const prod = series(
  prodClean,
  parallel(prodStyles, prodScripts, prodImages, prodPug, prodFonts, prodThirdParty, prodWebsiteFavicon),
  buildFinish
)
