import {
  CLASS_SLIDER,
  CLASS_ZOOMER_IN,
  CLASS_ZOOMER_OUT
} from './../shared/constants'

export default {
  // {String} set initial image status
  fill: 'cover',
  // {String / querySelector} the attribute of image source or a image element
  src: 'data-zoomist-src',
  // {Boolean} set is draggable or not
  draggable: true,
  // {Boolean} set is wheelable or not
  wheelable: true,
  // {Boolean} set is pinchable or not
  pinchable: true,
  // {Boolean} set image can be drag out of the bounds (it will set to false when fill is contain)
  bounds: true,
  // {Number} the ratio of zoom at one time
  zoomRatio: 0.1,
  // {Number > 1, False} the max ratio of the image (compare to the initial image status)
  maxRatio: false,
  // {Boolean / String}
  height: 'auto'
}

export const DEFAULT_SLIDER_OPTIONS = {
  // {String / querySelector} the css selector string or a element of the slider
  el: CLASS_SLIDER,
  // {String} the direction of the slider 'horizontal' or 'vertical'
  direction: 'horizontal',
  // {Number} the max ratio of the slider (only work on options.maxRatio = false)
  maxRatio: 2
}

export const DEFAULT_ZOOMER_OPTIONS = {
  // {String / querySelector} the css selector string or a element of the in zoomer
  inEl: CLASS_ZOOMER_IN,
  // {String / querySelector} the css selector string or a element of the out zoomer
  outEl: CLASS_ZOOMER_OUT,
  // {Boolean} in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disableOnBounds: true
}

export const EVENTS = {
  // invoked when zoomist instance ready
  ready: null,
  // invoked when image is zooming
  zoom: null,
  // invoked when wheeling
  wheel: null,
  // invoked when mousedown on wrapper
  dragStart: null,
  // invoked when dragging the image
  drag: null,
  // invoked when mouseup on wrapper
  dragEnd: null,
  // invoked when mousedown on wrapper
  pinchStart: null,
  // invoked when pinching the image
  pinch: null,
  // invoked when mouseup on wrapper
  pinchEnd: null,
  // invoked when mousedown on slider
  slideStart: null,
  // invoked when sliding the slider
  slide: null,
  // invoked when mouseup on slider
  slideEnd: null,
  // invoked when image changes it's size
  resize: null,
  // invoked when reset methods be used
  reset: null,
  // invoked when destroy methods be used
  destroy: null,
  // invoked when update methods be used
  update: null
}