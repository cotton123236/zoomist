import {
  ZoomistDefaultOptions,
  SliderOptions,
  ZoomerOptions,
  ZoomistEvents,
  ZoomistModules,
} from './../types'
import {
  CLASS_NOT_DRAGGABLE,
  CLASS_NOT_WHEELABLE,
  CLASS_SLIDER,
  CLASS_ZOOMER,
  CLASS_ZOOMER_IN,
  CLASS_ZOOMER_OUT,
  CLASS_ZOOMER_RESET,
  CLASS_ZOOMER_DISABLE,
} from '../shared/constants'


export const DEFAULT_OPTIONS: ZoomistDefaultOptions = {
  // set is draggable or not
  draggable: true,
  // set is wheelable or not
  wheelable: true,
  // set is pinchable or not
  pinchable: true,
  // set image stuck on bounds
  bounds: true,
  // the ratio of zooming at one time
  zoomRatio: 0.1,
  // the max scale of zoomist-image (must be number larger then initScale)
  maxScale: 10,
  // the min scale of zoomist-image (must be number smaller then initScale)
  minScale: 1,
  // set initial scale of zoomist-image
  initScale: null,
  // if set to true, enable to release touch events to allow for further page scrolling when .zoomist-image is on bounds.
  dragReleaseOnBounds: false,
  // if set to true, enable to release wheel events to allow for further page scrolling when .zoomist-image is on mixScale or maxScale.
  wheelReleaseOnMinMax: false,
  // elements matched this class will not be dragged.
  disableDraggingClass: CLASS_NOT_DRAGGABLE,
  // elements matched this class will not be zoomed by mouse wheel.
  disableWheelingClass: CLASS_NOT_WHEELABLE,
  // if set to true, enable to smooth drag
  smooth: false,
}

export const SLIDER_OPTIONS: SliderOptions = {
  // the css selector string or a element of the slider
  el: null,
  // the direction of the slider 'horizontal' or 'vertical'
  direction: 'horizontal'
}

export const SLIDER_AUTO_GENERATED: Partial<SliderOptions> = {
  el: `.${CLASS_SLIDER}`
}

export const ZOOMER_OPTIONS: ZoomerOptions = {
  el: null,
  // the css selector string or a element for in-zoomer
  inEl: null,
  // the css selector string or a element for out-zoomer
  outEl: null,
  // the css selector string or a element for reset-zoomer
  resetEl: null,
  // in zoomer and out zoomer will be disabled when image comes to maximin or minimum
  disabledClass: CLASS_ZOOMER_DISABLE
}

export const ZOOMER_AUTO_GENERATED: Partial<ZoomerOptions> = {
  el: `.${CLASS_ZOOMER}`,
  inEl: `.${CLASS_ZOOMER_IN}`,
  outEl: `.${CLASS_ZOOMER_OUT}`,
  resetEl: `.${CLASS_ZOOMER_RESET}`
}


export const ZOOMIST_EVENTS: ZoomistEvents = {
  // invoked when zoomist instance ready
  ready: null,
  // invoked when reset methods be used
  reset: null,
  // invoked when image changes it's size
  resize: null,
  // invoked before destroy methods be used
  beforeDestroy: null,
  // invoked after destroy methods be used
  destroy: null,
  // invoked before update methods be used
  beforeUpdate: null,
  // invoked when update methods be used
  update: null,
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
  slideEnd: null
}


export const ZOOMIST_MODULES: ZoomistModules = {
  // slider options
  slider: null,
  // zoomer options
  zoomer: null
}
