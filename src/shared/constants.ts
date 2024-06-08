import {
  ConstEventTouchStart,
  ConstEventTouchMove,
  ConstEventTouchEnd,
  ConstEventWheel,
  MoveToKeywordsX,
  MoveToKeywordsY
} from './../types'

export const NAME = 'zoomist' as const

export const MODULES: string[] = ['slider', 'zoomer']

export const CLASS_CONTAINER: string = `${NAME}-container`
export const CLASS_WRAPPER: string = `${NAME}-wrapper`
export const CLASS_IMAGE: string = `${NAME}-image`

export const CLASS_NOT_DRAGGABLE: string = `${NAME}-not-draggable`
export const CLASS_NOT_WHEELABLE: string = `${NAME}-not-wheelable`

export const CLASS_SLIDER: string = `${NAME}-slider`
export const CLASS_SLIDER_TRACK: string = `${NAME}-slider-wrapper`
export const CLASS_SLIDER_BAR: string = `${NAME}-slider-bar`
export const CLASS_SLIDER_BUTTON: string = `${NAME}-slider-button`

export const CLASS_ZOOMER: string = `${NAME}-zoomer`
export const CLASS_ZOOMER_BUTTON: string = `${NAME}-zoomer-button`
export const CLASS_ZOOMER_ICON: string = `${NAME}-zoomer-icon`
export const CLASS_ZOOMER_IN: string = `${NAME}-zoomer-in`
export const CLASS_ZOOMER_OUT: string = `${NAME}-zoomer-out`
export const CLASS_ZOOMER_RESET: string = `${NAME}-zoomer-reset`
export const CLASS_ZOOMER_DISABLE: string = `${NAME}-zoomer-disabled`

export const ATTR_SLIDER_BUTTON: Record<string, string> = {
  tabindex: '0',
  role: 'slider',
  'aria-label': 'slider for zoomist',
  'aria-valuemin': '0',
  'aria-valuemax': '100',
  'aria-valuenow': '0',
  'aria-disabled': 'false'
}

const ATTR_ZOOMER_BUTTON = {
  tabindex: '0',
  role: 'button',
  type: 'button',
  'aria-disabled': 'false'
}
export const ATTR_ZOOMER_IN: Record<string, string> = {
  ...ATTR_ZOOMER_BUTTON,
  'aria-label': 'button for zoom in zoomist'
}
export const ATTR_ZOOMER_OUT: Record<string, string> = {
  ...ATTR_ZOOMER_BUTTON,
  'aria-label': 'button for zoom out zoomist'
}
export const ATTR_ZOOMER_RESET: Record<string, string> = {
  ...ATTR_ZOOMER_BUTTON,
  'aria-label': 'button for reset zoomist scale'
}

export const IS_BROWSER: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const IS_TOUCH: boolean = IS_BROWSER && 'ontouchstart' in window

export const EVENT_TOUCH_START: ConstEventTouchStart = IS_TOUCH ? 'touchstart' : 'mousedown'
export const EVENT_TOUCH_MOVE: ConstEventTouchMove = IS_TOUCH ? 'touchmove' : 'mousemove'
export const EVENT_TOUCH_END: ConstEventTouchEnd = IS_TOUCH ? 'touchend' : 'mouseup'
export const EVENT_WHEEL: ConstEventWheel = 'wheel'

export const MOVE_TO_KEYWORDS_X: [MoveToKeywordsX, ...MoveToKeywordsX[]] = ['left', 'right', 'center']
export const MOVE_TO_KEYWORDS_Y: [MoveToKeywordsY, ...MoveToKeywordsY[]] = ['top', 'bottom', 'center']

export const CSSVAR_IMAGE_SCALE: string = '--scale'
export const CSSVAR_IMAGE_TRANSLATE_X: string = '--translate-x'
export const CSSVAR_IMAGE_TRANSLATE_Y: string = '--translate-y'
export const CSSVAR_SLIDER_VALUE: string = '--value'
