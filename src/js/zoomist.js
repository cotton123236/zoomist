import DEFAULT_OPTIONS from './core/options'
import TEMPLATE from './core/template'
import bindEvents from './core/events'
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
    this.parent = this.element.parentNode
    
    this.init()
  }

  init() {
    const { element, options, parent } = this

    if (element[NAME]) return;

    element[NAME] = this
    
    const src = options.src = isString(options.src) ? options.src : DEFAULT_OPTIONS.src
    const url = element.getAttribute(src)
    
    this.create(url)
  }
  
  create(url) {
    if (!url) return;

    const { element, parent } = this
    const { offsetWidth, offsetHeight } = element
    
    this.url = url
    this.data = {}
    this.data.container = {
      width: offsetWidth,
      height: offsetHeight,
      ratio: offsetWidth / offsetHeight,
      position: getStyle(element, 'position') === 'static' ? 'relative' : getStyle(element, 'position'),
      top: getStyle(element, 'top'),
      left: getStyle(element, 'left'),
      right: getStyle(element, 'right'),
      bottom: getStyle(element, 'bottom'),
      widthPercentage: offsetWidth / parent.offsetWidth
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

    const { data } = this
    const { position, top, left, right, bottom, width, height } = data.container

    const template = document.createElement('div')
    template.innerHTML = TEMPLATE(this)
    template.classList.add(CLASS_CONTAINER)

    this.container = template
    this.wrapper = template.querySelector(`.${CLASS_WRAPPER}`)
    this.image = template.querySelector(`.${CLASS_IMAGE}`)

    const { naturalWidth, naturalHeight } = this.image

    this.data.image = {
      naturalWidth,
      naturalHeight,
      ratio: naturalWidth / naturalHeight
    }

    // get base side, if 0 base on width, if 1 base on height
    const baseSide = data.container.ratio > data.image.ratio ? 0 : 1
    const wrapperWidth = !baseSide ? data.container.width : height * data.image.ratio
    const wrapperHeight = baseSide ? data.container.height : width / data.image.ratio

    this.data.wrapper = {
      width: wrapperWidth,
      height: wrapperHeight,
      ratio: data.image.ratio,
      left: !baseSide ? 0 : - (wrapperWidth - width) / 2,
      top: baseSide ? 0 : - (wrapperHeight - height) / 2
    }

    setStyle(this.container, {
      position,
      top,
      left,
      right,
      bottom,
      width,
      height
    })

    setStyle(this.wrapper, {
      width: data.wrapper.width,
      height: data.wrapper.height,
      left: data.wrapper.left,
      top: data.wrapper.top,
    })

    bindEvents(this)

    this.mounted = true
    
    this.render()
  }

  render() {
    const {element, container, parent} = this

    element.classList.add(CLASS_HIDE)
    element.parentNode.insertBefore(container, element.nextSibling)
  }
}

export default Zoomist