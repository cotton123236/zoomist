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

// 
export const getStyle = (element, prop) => {
  return element[prop] || element.style[prop] || window.getComputedStyle(element).getPropertyValue(prop)
}

export const setStyle = (element, obj) => {
  for (const [k, v] of Object.entries(obj)) {
    element.style[k] = isNumber(v) ? `${v}px` : v
  }
}
