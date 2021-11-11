import {
  CLASS_SLIDER,
  CLASS_ZOOMER_IN,
  CLASS_ZOOMER_OUT
} from './../shared/constants'

export default {
  fill: 'cover',
  src: 'data-zoomist-src',
  draggable: true,
  bounds: true,
  zoomRatio: 0.1,
  maxRatio: false,
  wheel: true,
}

export const DEFAULT_SLIDER_OPTIONS = {
  el: CLASS_SLIDER,
  direction: 'horizontal', // 'vertical',
  maxRatio: 2
}

export const DEFAULT_ZOOMER_OPTIONS = {
  inEl: CLASS_ZOOMER_IN,
  outEl: CLASS_ZOOMER_OUT,
  disableOnBounds: true
}