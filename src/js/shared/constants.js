export const NAME = 'zoomist'

export const CLASS_CONTAINER = `${NAME}-container`
export const CLASS_IMAGE = `${NAME}-image`

export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined'
export const IS_TOUCH = IS_BROWSER && window.document.documentElement ? 'ontouchstart' in window.document.documentElement : false

export const EVENT_TOUCH_START = IS_TOUCH ? 'touchstart' : 'mousedown'
export const EVENT_TOUCH_MOVE = IS_TOUCH ? 'touchmove' : 'mousemove'
export const EVENT_TOUCH_END = IS_TOUCH ? 'touchend touchcancel' : 'mouseup'