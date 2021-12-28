import { IS_TOUCH } from './constants'

// check value is a object and not null
export const isObject = (value) => {
  return typeof value === 'object' && value !== null;
}

// check value is a plain object
export const isPlainObject = (value) => {
  if (!isObject(value)) return false
  try {
    const { constructor } = value
    const { prototype } = constructor
    const { hasOwnProperty } = Object.prototype
    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf')
  } catch (error) {
    return false
  }
}

// set object key and value
export const setObject = (obj, value) => {
  if (!obj) obj = {}
  for (const [k, v] of Object.entries(value)) {
    obj[k] = v
  }
}

// make a new object from old object
export const getNewObject = (value) => {
  return Object.assign({}, value)
}

// check value is string and not empty
export const isString = (value) => {
  return typeof value === 'string' && value !== ''
}

// check value is number and not NaN
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
}

// check element is exist
export const isElementExist = (value) => {
  return getElement(value) !== null
}

// if value is an element then return value, if not then query value
export const getElement = (value) => {
  return value instanceof HTMLElement ? value : document.querySelector(value)
}

// check value is img tag or not
export const isImg = (value) => {
  return isElementExist(value) && getElement(value).tagName === 'IMG'
}

// check value is a function
export const isFunction = (value) => {
  return typeof value === 'function';
}

// check value is percentage
export const isPercentage = (value) => {
  return value.indexOf('%') > -1
}

// get elemant style
export const getStyle = (element, prop) => {
  return element[prop] || element.style[prop] || window.getComputedStyle(element).getPropertyValue(prop)
}

// foreach set style
export const setStyle = (element, obj) => {
  for (const [k, v] of Object.entries(obj)) {
    element.style[k] = isNumber(v) ? `${v}px` : v
  }
}

// get mouse pageX and pageY
export const getPointer = (event) => {
  const isNotTouch = !IS_TOUCH || event.type === 'wheel'
  return {
    x: isNotTouch ? event.pageX : event.touches[0].pageX,
    y: isNotTouch ? event.pageY : event.touches[0].pageY,
    clientX: isNotTouch ? event.clientX : event.touches[0].clientX,
    clientY: isNotTouch ? event.clientY : event.touches[0].clientY
  }
}

// get transformX
export const getTransformX = (target) => {
  const transform = getComputedStyle(target).transform
  let mat = transform.match(/^matrix3d\((.+)\)$/)
  if (mat) return parseFloat(mat[1].split(', ')[12])
  mat = transform.match(/^matrix\((.+)\)$/)
  return mat ? parseFloat(mat[1].split(', ')[4]) : 0
}

// get transformY
export const getTransformY = (target) => {
  const transform = getComputedStyle(target).transform
  let mat = transform.match(/^matrix3d\((.+)\)$/)
  if (mat) return parseFloat(mat[1].split(', ')[13])
  mat = transform.match(/^matrix\((.+)\)$/)
  return mat ? parseFloat(mat[1].split(', ')[5]) : 0
}

// like .toFixed(2)
export const roundToTwo = (value) => {
  return +(Math.round(value + "e+2")  + "e-2")
}

// limit value
export const minmax = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

// first letter to uppercase
export const upperFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

