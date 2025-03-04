import {
  StyleObject,
  PointerData,
  BoundingRect,
  AppTouchEvent,
} from './../types'


// check value is a plain object
export const isPlainObject = (value: object | void): boolean => {
  if (!value) return false
  try {
    const { constructor } = value
    const { prototype } = constructor
    const { hasOwnProperty } = Object.prototype
    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf')
  } catch (error) {
    return false
  }
}

// check value is function
export const isFunction = (value: any): boolean => {
  return typeof value === 'function'
}

// check value is number
export const isNumber = (value: any): boolean => {
  return !isNaN(Number(value))
}

// check value is null or undefined
export const isNull = (value: any): boolean => {
  return value === null || value === undefined
}


// if value is an element then return value, if not then query value
export const getElement = (value: HTMLElement | string): HTMLElement | null => {
  return value instanceof HTMLElement ? value : document.querySelector<HTMLElement>(value)
}

// get closest element
export const getClosestElement = (target: HTMLElement, className: string): HTMLElement | null => {
  return className ? target.closest(`.${className}`) : null
}

// get mouse clientX, clientY
export const getPointer = (e: MouseEvent | AppTouchEvent): PointerData => {
  const event = 'touches' in e ? e.touches[0] : e
  return {
    clientX: event.clientX,
    clientY: event.clientY
  }
}

// get pinch pointer center
export const getTouchesCenter = (touches: TouchList): PointerData => {
  return {
    clientX: [...touches].map(touch => touch.clientX).reduce((prev, current) => prev + current) / touches.length,
    clientY: [...touches].map(touch => touch.clientY).reduce((prev, current) => prev + current) / touches.length
  }
}

// getBoundingClientRect
export const getBoundingRect = (target: HTMLElement): BoundingRect => {
  const { width, height, top, left, bottom } = target.getBoundingClientRect()
  return {
    width,
    height,
    top,
    left,
    bottom
  }
}

// get two fingers center
export const getPinchHypot = (touches: AppTouchEvent['touches']): number => {
  return touches.length >= 2 ? Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY) : 0
}


// set styles
export const setStyle = (element: HTMLElement, value: StyleObject): void => {
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === 'string') {
      element.style.setProperty(k, v)
    }
  }
}

// set attributes
export const setAttributes = (element: HTMLElement, value: Record<string, string>): void => {
  for (const [k, v] of Object.entries(value)) {
    element.setAttribute(k, v)
  }
}


// set object key and value
type Entries<T> = {
  [K in keyof T]: [K, T [K]]
} [keyof T] []

export const setObject = <T, K extends keyof T>(obj: T, value: Pick<T, K>): void => {
  for (const [k, v] of Object.entries(value) as Entries<Pick<T, K>>) {
    obj[k] = v
  }
}


// get value between min and max
export const minmax = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

// like .toFixed(2)
export const roundToTwo = (value: number): number => {
  const roundValue = +(Math.round(Number(value + "e+2"))  + "e-2")
  return isNaN(roundValue) ? 0 : roundValue
}

// throw Error msg
export const useError = (msg: string): never => {
  throw new Error(msg)
}

// throw Error msg
export const useWarn = (msg: string): void => {
  return console.warn(msg)
}

// create element
export const createElement = (tagName: string = 'div', className?: string, attributes?: Record<string, string>, children?: string): HTMLElement => {
  const el = document.createElement(tagName)
  if (className) {
    el.classList.add(...className.split(' '))
  }
  if (attributes) {
    setAttributes(el, attributes)
  }
  if (children) {
    el.innerHTML = children
  }

  return el
}
