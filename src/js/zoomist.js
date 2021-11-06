import DEFAULT_OPTIONS from './core/options'
import methods from './core/methods'
import bindEvents from './core/events'
import {
  isPlainObject,
  isString,
  isNumber,
  isElementExist,
  getElement,
  setStyle
} from './shared/utils'
import {
  NAME,
  CLASS_CONTAINER,
  CLASS_IMAGE
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
    
    element.removeAttribute(src)
    
    this.create(url)
  }
  
  create(url) {
    if (!url) return;
    
    const { element } = this
    const { offsetWidth, offsetHeight } = element
    
    this.url = url
    this.data = {}
    this.data.containerData = {
      width: offsetWidth,
      height: offsetHeight,
      ratio: offsetWidth / offsetHeight,
    }

    this.mount()
  }
  
  mount() {
    if (this.mounted) return;

    const { options, data, url } = this
    const { containerData } = data
    const { fill, maxRatio } = options

    if (this.image) this.image.remove()

    const image = document.createElement('img')
    image.classList.add(CLASS_IMAGE)
    image.src = url

    image.onload = () => {
      this.image = image
      
      const { naturalWidth, naturalHeight } = image
      const imageRatio = naturalWidth / naturalHeight
  
      // get base on width or height
      let baseSide
      if (fill !== 'cover' && fill !== 'contain' && fill !== 'none') options.fill = 'cover'
      if (options.fill === 'cover') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'width' : 'height'
      if (options.fill === 'contain') baseSide = containerData.ratio === imageRatio ? 'both' : containerData.ratio > imageRatio ? 'height' : 'width'
  
      // calculate the image width, height, left, top
      const imageWidth = options.fill === 'none' ? naturalWidth : baseSide === 'both' || baseSide === 'width' ? containerData.width : containerData.height * imageRatio
      const imageHeight = options.fill === 'none' ? naturalHeight : baseSide === 'both' || baseSide === 'height' ? containerData.height : containerData.width / imageRatio
      const imageLeft = (containerData.width - imageWidth) / 2
      const imageTop = (containerData.height - imageHeight) / 2

      this.data.originImageData = {
        naturalWidth,
        naturalHeight,
        width: imageWidth,
        height: imageHeight,
        ratio: imageRatio,
        left: imageLeft,
        top: imageTop
      }
      this.data.imageData = Object.assign({}, this.data.originImageData)

      // if has maxRatio
      if (( !isNumber(maxRatio) || maxRatio <= 1 ) && maxRatio !== false) options.maxRatio = false
      if (options.maxRatio) {
        const { maxRatio } = options
        this.data.maxImageData  = {
          width: imageWidth * maxRatio,
          height: imageHeight * maxRatio,
          left: ( containerData.width - imageWidth * maxRatio ) / 2,
          top: ( containerData.height - imageHeight * maxRatio ) / 2
        }
      }

      setStyle(image, {
        width: imageWidth,
        height: imageHeight,
        left: imageLeft,
        top: imageTop,
      })

      bindEvents(this)
  
      this.mounted = true
      
      this.render()
    }
  }

  render() {
    const { element, image, options } = this

    element.classList.add(CLASS_CONTAINER)
    element.append(image)

    // if (options.slider) 
  }
}

Object.assign(Zoomist.prototype, methods)

export default Zoomist