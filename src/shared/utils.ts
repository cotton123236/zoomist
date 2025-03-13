import {
  StyleObject,
  PointerData,
  BoundingRect,
  AppTouchEvent,
} from './../types'


// check value is a plain object
export const isPlainObject = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
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
  if ('touches' in e) {
    if (e.touches.length === 0) return { clientX: 0, clientY: 0 }
    if (e.touches.length === 1) return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }

    return {
      clientX: [...e.touches].reduce((sum, touch) => (sum + touch.clientX), 0) / e.touches.length,
      clientY: [...e.touches].reduce((sum, touch) => (sum + touch.clientY), 0) / e.touches.length
    }
  }

  return { clientX: e.clientX, clientY: e.clientY }
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
export const getPinchHypot = (e: AppTouchEvent): number => {
  return e.touches.length >= 2 ? Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY) : 0
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
  if (isNaN(value)) return 0
  return Math.round(value * 100) / 100
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
