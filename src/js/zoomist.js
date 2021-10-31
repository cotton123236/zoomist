import DEFAULT_OPTIONS from './core/options'
import TEMPLATE from './core/template'
import {
  isObject,
  isPlainObject,
  isString,
  isElementExist,
  getElement,
  isImg,
  getStyle,
  setStyle
} from './shared/utils'
import {
  NAME,
  CLASS_CONTAINER,
  CLASS_WRAPPER,
  CLASS_IMAGE,
  CLASS_HIDE
} from './shared/constants'



class Zoomist {
  /**
   * 
   * @param {Element} element - target element 
   * @param {Object} options - the configuration options
   */
  constructor(element, options = {}) {
    if (!element) throw new Error('The first argument is required.')
    if (!isElementExist(element)) throw new Error('This element is not exist.')

    this.element = getElement(element)
    this.options = Object.assign({}, DEFAULT_OPTIONS, isPlainObject(options) && options)
    
    this.init()
  }

  init() {
    const { element, options } = this

    if (element[NAME]) return;

    element[NAME] = this
    
    const src = options.src = isString(options.src) ? options.src : DEFAULT_OPTIONS.src
    const url = element.getAttribute(src)
    
    this.create(url)
  }
  
  create(url) {
    if (!url) return;

    const { element } = this
    const { offsetWidth, offsetHeight } = element
    
    this.url = url
    this.style = {}
    this.style.container = {
      width: offsetWidth,
      height: offsetHeight,
      ratio: offsetWidth / offsetHeight,
      position: getStyle(element, 'position') === 'static' ? 'relative' : getStyle(element, 'position'),
      top: getStyle(element, 'top'),
      left: getStyle(element, 'left'),
      right: getStyle(element, 'right'),
      bottom: getStyle(element, 'bottom')
    }
    
    if(isImg(element)) {
      element.onload = () => {
        const { offsetWidth, offsetHeight } = element

        this.style.container.width = offsetWidth
        this.style.container.height = offsetHeight

        this.mount()
      }
    }
    else this.mount()
  }
  
  mount() {
    if (this.mounted) return;

    const { style } = this
    const { position, top, left, right, bottom, width, height } = style.container

    const template = document.createElement('div')
    template.innerHTML = TEMPLATE(this)
    template.classList.add(CLASS_CONTAINER)

    setStyle(template, {
      position,
      top,
      left,
      right,
      bottom,
      width,
      height
    })

    this.container = template
    this.wrapper = template.querySelector(`.${CLASS_WRAPPER}`)
    this.image = template.querySelector(`.${CLASS_IMAGE}`)

    this.mounted = true
    
    this.render()
  }

  render() {
    const {element, container} = this

    element.classList.add(CLASS_HIDE)
    element.parentNode.insertBefore(container, element.nextSibling)
  }
}

export default Zoomist