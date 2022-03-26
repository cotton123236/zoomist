import {
  setStyle,
  setObject,
  getNewObject,
  getTransformX,
  getTransformY,
  roundToTwo,
  minmax,
  isFunction
} from './../shared/utils'
import {
  NAME,
  CLASS_CONTAINER,
  CLASS_ZOOMER_DISABLE
} from './../shared/constants'

export default {
  /**
   * get container (element) data
   * @returns {Object}
   */
  getContainerData() {
    return getNewObject(this.data.containerData)
  },

  /**
   * get image data
   * @returns {Object}
   */
  getImageData() {
    return getNewObject(this.data.imageData)
  },

  /**
   * get slider value
   * @returns {Number}
   */
  getSliderValue() {
    return this.__modules__.slider?.value
  },

  /**
   * get now zoom ratio
   * @returns {Number}
   */
  getZoomRatio() {
    return this.ratio
  },

  /**
   * zoom
   * zoomRatio - zoomin when pass a positive number, zoomout when pass a negative number
   * pointer - a object which return from getPoiner()
   * @param {Number, Object} 
   */
  zoom(zoomRatio, pointer) {
    const { image, data, options, ratio } = this
    const { bounds, maxRatio } = options

    if (bounds && ratio === 1 && zoomRatio < 0) return;
    if (maxRatio && ratio === maxRatio && zoomRatio > 0) return;

    const { originImageData } = data
    const containerData = this.getContainerData()
    const imageData = this.getImageData()
    const imageRect = image.getBoundingClientRect()

    const calcRatio = roundToTwo(ratio * (zoomRatio + 1))
    const newRatio = bounds && calcRatio < 1 ? 1 : maxRatio && calcRatio > maxRatio ? maxRatio : calcRatio
    const newZoomRatio = newRatio / ratio - 1

    const newWidth = originImageData.width * newRatio
    const newHeight = originImageData.height * newRatio
    const newLeft = (containerData.width - newWidth) / 2
    const newTop = (containerData.height - newHeight) / 2
    const distanceX = pointer ? ( imageData.width / 2 - pointer.clientX + imageRect.left ) * newZoomRatio + getTransformX(image) : getTransformX(image)
    const distanceY = pointer ? ( imageData.height / 2 - pointer.clientY + imageRect.top ) * newZoomRatio + getTransformY(image) : getTransformY(image)
    const transformX = bounds ? minmax(distanceX, newLeft, -newLeft) : distanceX
    const transformY = bounds ? minmax(distanceY, newTop, -newTop) : distanceY

    const newData = {
      width: newWidth,
      height: newHeight,
      left: newLeft,
      top: newTop
    }

    setObject(data.imageData, newData)

    setStyle(image, {
      ...newData,
      transform: `translate(${transformX}px, ${transformY}px)`
    })

    this.ratio = newRatio

    this.emit('zoom', newRatio)

    // if has slider
    if (options.slider) {
      const { slider } = this.__modules__
      const ratioPercentage = roundToTwo(1 - ( slider.maxRatio - newRatio ) / ( slider.maxRatio - 1 )) * 100

      slider.value = minmax(ratioPercentage, 0, 100)

      this.slideTo(ratioPercentage, true)
    }

    // if zoomer disableOnBounds
    if (options.zoomer) {
      const { zoomer } = this.__modules__
      if (zoomer.disableOnBounds) {
        const { bounds } = options
        const { zoomerInEl, zoomerOutEl } = this.__modules__.zoomer

        bounds && this.ratio === 1 ? zoomerOutEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerOutEl.classList.remove(CLASS_ZOOMER_DISABLE)
        this.ratio === maxRatio ? zoomerInEl.classList.add(CLASS_ZOOMER_DISABLE) : zoomerInEl.classList.remove(CLASS_ZOOMER_DISABLE)
      }
    }

    return this
  },

  /**
   * zoomTo (zoom to a specific ratio)
   * zoomRatio - zoomin when pass a number more than 1, zoomout when pass a number less than 1
   * @param {Number} 
   */
  zoomTo(zoomRatio) {
    const { ratio } = this

    if (zoomRatio !== ratio) {
      const calcRatio = zoomRatio / ratio - 1
      this.zoom(calcRatio)
    }

    return this
  },

  move(x = 0, y = 0) {
    const { image, data, options } = this
    const { imageData, dragData } = data
    const { top, left } = imageData
    const { transX, transY } = dragData
    const { bounds } = options

    const calcTransX = bounds ? minmax(transX - x, left, -left) : transX - x
    const calcTransY = bounds ? minmax(transY - y, top, -top) : transY - y
    const newTransX = roundToTwo(calcTransX)
    const newTransY = roundToTwo(calcTransY)

    setObject(dragData, {
      transX: newTransX,
      transY: newTransY
    })
    image.style.transform = `translate(${newTransX}px, ${newTransY}px)`

    return this
  },

  moveTo(x, y) {
    const { data, options } = this
    const { imageData, dragData } = data
    const { top, left } = imageData
    const { transX, transY } = dragData
    const { bounds } = options

    x = x ?? Math.abs(left)
    y = y ?? Math.abs(top)

    const calcTransX = bounds ? minmax(left + x + transX, left, -left) : left + x + transX
    const calcTransY = bounds ? minmax(top + y + transY, top, -top) : top + y + transY

    this.move(calcTransX, calcTransY)

    return this
  },

  /**
   * slideTo (only work on the slider)
   * value - a numer between 0-100
   * @param {Number}
   */
  slideTo(value, onlySlide) {
    const { __modules__ } = this

    if (!__modules__.slider) return;

    const { slider } = __modules__

    const position = slider.direction === 'horizontal' ? 'left' : 'top'
    const symbol = slider.direction === 'horizontal' ? '' : '-'
    const distance = minmax(value, 0, 100)

    slider.sliderButton.style[position] = `${symbol}${distance}%`

    if (!onlySlide) {
      const percentage = distance / 100
      const minRatio = this.ratio < 1 ? this.ratio : 1
      const maxRatio = this.ratio > slider.maxRatio ? this.ratio : slider.maxRatio
      const ratio = ( maxRatio - minRatio ) * percentage + minRatio

      this.zoomTo(ratio)
    }

    return this
  },

  /**
   * reset image to initial status
   */
  reset() {
    const { image } = this

    this.zoomTo(1)

    setStyle(image, {
      transform: 'translate(0, 0)'
    })

    this.emit('reset')
    
    return this
  },
  
  /**
   * destory the instance of zoomist
   */
  destroy() {
    const { element, wrapper } = this
    const { slider, zoomer } = this.__modules__

    element[NAME] = undefined
    this.mounted = false
    
    if (slider) this.destroySlider()
    if (zoomer) this.destroyZoomer()
    
    wrapper.remove()
    element.style.removeProperty('width')
    element.style.removeProperty('padding-bottom')
    element.classList.remove(CLASS_CONTAINER)

    this.emit('destroy')

    return this
  },

  /**
   * a syntactic sugar of destroy and init
   */
  update() {
    this.destroy().init()

    this.emit('update')

    return this
  },

  /**
   * add handler on __events__
   * @param {String} events 
   * @param {Function} handler 
   */
  on(events, handler) {
    if (!isFunction(handler)) return this;

    const { __events__ } = this

    events.split(' ').forEach(evt => {
      if (!__events__[evt]) __events__[evt] = []
      __events__[evt].push(handler)
    })

    return this
  },

  /**
   * invoke handlers in __events__[event]
   * @param  {String, ...} args 
   */
  emit(...args) {
    const { __events__ } = this

    const event = args[0]
    const data = args.slice(1, args.length)

    if (!__events__[event]) return this

    __events__[event].forEach(handler => {
      if (isFunction(handler)) handler.apply(this, data)
    })

    return this
  }
}